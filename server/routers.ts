import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { uploadFile, getFilesByUser, deleteFile, updateFile } from "./db";
import { storagePut } from "./storage";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  files: router({
    upload: protectedProcedure
      .input(z.object({
        filename: z.string(),
        fileData: z.string(),
        mimeType: z.string(),
        fileSize: z.number(),
        category: z.string().default("general"),
        description: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const buffer = Buffer.from(input.fileData, 'base64');
        const fileKey = `nursery-files/${ctx.user.id}/${Date.now()}-${input.filename}`;
        const { url } = await storagePut(fileKey, buffer, input.mimeType);

        const file = await uploadFile({
          userId: ctx.user.id,
          filename: input.filename,
          fileKey,
          fileUrl: url,
          mimeType: input.mimeType,
          fileSize: input.fileSize,
          category: input.category,
          description: input.description,
        });

        return file;
      }),

    list: protectedProcedure
      .input(z.object({
        category: z.string().optional(),
      }).optional())
      .query(async ({ input, ctx }) => {
        const files = await getFilesByUser(ctx.user.id);
        if (input?.category) {
          return files.filter(f => f.category === input.category);
        }
        return files;
      }),

    delete: protectedProcedure
      .input(z.object({
        fileId: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        await deleteFile(input.fileId, ctx.user.id);
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        fileId: z.number(),
        description: z.string().optional(),
        category: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const updates: Record<string, unknown> = {};
        if (input.description !== undefined) updates.description = input.description;
        if (input.category !== undefined) updates.category = input.category;

        const file = await updateFile(input.fileId, ctx.user.id, updates);
        return file;
      }),
  }),
});

export type AppRouter = typeof appRouter;
