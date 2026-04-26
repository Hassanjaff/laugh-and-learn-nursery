import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, files, File, InsertFile } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// File storage operations
export async function uploadFile(file: InsertFile): Promise<File> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  await db.insert(files).values(file);
  
  // Get the most recently uploaded file for this user
  const uploaded = await db.select().from(files)
    .where(eq(files.userId, file.userId))
    .orderBy((f) => f.createdAt)
    .limit(1);
  
  if (uploaded.length === 0) {
    throw new Error("Failed to retrieve uploaded file");
  }
  
  return uploaded[0];
}

export async function getFilesByUser(userId: number): Promise<File[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(files).where(eq(files.userId, userId));
}

export async function getFilesByCategory(userId: number, category: string): Promise<File[]> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  return await db.select().from(files).where(
    eq(files.userId, userId) && eq(files.category, category)
  );
}

export async function deleteFile(fileId: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const file = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  if (file.length === 0 || file[0].userId !== userId) {
    throw new Error("File not found or unauthorized");
  }

  await db.delete(files).where(eq(files.id, fileId));
  return true;
}

export async function updateFile(fileId: number, userId: number, updates: Partial<InsertFile>): Promise<File> {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  const file = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  if (file.length === 0 || file[0].userId !== userId) {
    throw new Error("File not found or unauthorized");
  }

  await db.update(files).set(updates).where(eq(files.id, fileId));
  
  const updated = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  if (updated.length === 0) {
    throw new Error("Failed to retrieve updated file");
  }
  
  return updated[0];
}
