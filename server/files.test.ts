import { describe, it, expect, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import type { User } from "../drizzle/schema";

// Mock the database and storage functions
vi.mock("./db", () => ({
  uploadFile: vi.fn(async (file) => ({
    id: 1,
    ...file,
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
  getFilesByUser: vi.fn(async () => [
    {
      id: 1,
      userId: 1,
      filename: "test.jpg",
      fileKey: "nursery-files/1/test.jpg",
      fileUrl: "/manus-storage/nursery-files/1/test.jpg",
      mimeType: "image/jpeg",
      fileSize: 1024,
      category: "photos",
      description: "Test photo",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  deleteFile: vi.fn(async () => true),
  updateFile: vi.fn(async (fileId, userId, updates) => ({
    id: fileId,
    userId,
    filename: "test.jpg",
    fileKey: "nursery-files/1/test.jpg",
    fileUrl: "/manus-storage/nursery-files/1/test.jpg",
    mimeType: "image/jpeg",
    fileSize: 1024,
    category: updates.category || "photos",
    description: updates.description || "Test photo",
    createdAt: new Date(),
    updatedAt: new Date(),
  })),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn(async (key, buffer, mimeType) => ({
    key,
    url: `/manus-storage/${key}`,
  })),
}));

function createAuthContext(): TrpcContext {
  const user: User = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("File Storage Operations", () => {
  let ctx: TrpcContext;

  beforeEach(() => {
    ctx = createAuthContext();
  });

  describe("files.upload", () => {
    it("should upload a file successfully", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.upload({
        filename: "test.jpg",
        fileData: Buffer.from("fake image data").toString("base64"),
        mimeType: "image/jpeg",
        fileSize: 1024,
        category: "photos",
        description: "Test photo",
      });

      expect(result).toBeDefined();
      expect(result.filename).toBe("test.jpg");
      expect(result.category).toBe("photos");
      expect(result.mimeType).toBe("image/jpeg");
    });

    it("should use default category if not provided", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.upload({
        filename: "test.jpg",
        fileData: Buffer.from("fake image data").toString("base64"),
        mimeType: "image/jpeg",
        fileSize: 1024,
      });

      expect(result.category).toBe("general");
    });
  });

  describe("files.list", () => {
    it("should list all files for the user", async () => {
      const caller = appRouter.createCaller(ctx);

      const files = await caller.files.list();

      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
      expect(files[0].userId).toBe(ctx.user?.id);
    });

    it("should filter files by category", async () => {
      const caller = appRouter.createCaller(ctx);

      const files = await caller.files.list({ category: "photos" });

      expect(Array.isArray(files)).toBe(true);
      files.forEach((file) => {
        expect(file.category).toBe("photos");
      });
    });
  });

  describe("files.delete", () => {
    it("should delete a file successfully", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.delete({ fileId: 1 });

      expect(result.success).toBe(true);
    });
  });

  describe("files.update", () => {
    it("should update file description", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.update({
        fileId: 1,
        description: "Updated description",
      });

      expect(result.description).toBe("Updated description");
    });

    it("should update file category", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.update({
        fileId: 1,
        category: "activities",
      });

      expect(result.category).toBe("activities");
    });
  });
});
