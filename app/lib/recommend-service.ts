import { getSelf } from "./auth-service";
import prisma from "./db";

export const getRecommend = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
      where: {
        AND: [
          {
            NOT: {
              id: userId,
            },
          },
          {
            NOT: {
              following: {
                some: {
                  followerId: userId,
                },
              },
            },
          },
          {
            NOT: {
              blocking: {
                some: {
                  blockedid: userId,
                },
              },
            },
          },
        ],
      },
    });
    return users;
  } else {
    users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stream: {
          select: {
            isLive: true,
          },
        },
      },
    });
  }

  return users;
};
