import { getSelf } from "./auth-service";
import prisma from "./db";

export async function getStreams() {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await prisma.stream.findMany({
      where: {
        User: {
          NOT: {
            blocking: {
              some: {
                id: userId,
              },
            },
          },
        },
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        User: true,
        isLive: true,
      },
    });
  } else {
    streams = await prisma.stream.findMany({
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        name: true,
        thumbnailUrl: true,
        User: true,
        isLive: true,
      },
    });
  }

  return streams;
}
