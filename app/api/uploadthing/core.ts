import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getSelf } from "../../lib/auth-service";
import prisma from "../../lib/db";
import { revalidatePath } from "next/cache";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const self = await getSelf();

      if (!self) throw new UploadThingError("Unauthorized");

      return { user: self };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.stream.update({
        where: {
          userId: metadata.user.id,
        },
        data: {
          thumbnailUrl: file.url,
        },
      });

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
