import { getSelf } from "./auth-service";
import prisma from "./db";

export const getSearchResults = async (term: string) => {
  let userId;

  try {
    const self = await getSelf();
    userId = self?.id;
  } catch {
    userId = null;
  }

  let results = [];

  if (userId) {
    results = await prisma.stream.findMany({
      select: {
        id: true,
        isLive: true,
        isChatEnabled: true,
        isChatDelayed: true,
        isChatFollowersOnly: true,
        name: true,
        thumbnailUrl: true,
        updatedAt: true,
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      where: {
        User: {
          NOT: {
            blocking: {
              some: {
                blockedid: userId,
              },
            },
          },
        },
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            User: {
              userName: {
                contains: term,
              },
            },
          },
        ],
      },
    });
  } else {
    results = await prisma.stream.findMany({
      select: {
        id: true,
        isLive: true,
        isChatEnabled: true,
        isChatDelayed: true,
        isChatFollowersOnly: true,
        name: true,
        thumbnailUrl: true,
        updatedAt: true,
        User: {
          select: {
            id: true,
            userName: true,
            imageUrl: true,
          },
        },
      },
      orderBy: [
        {
          isLive: "desc",
        },
        {
          updatedAt: "desc",
        },
      ],
      where: {
        OR: [
          {
            name: {
              contains: term,
            },
          },
          {
            User: {
              userName: {
                contains: term,
              },
            },
          },
        ],
      },
    });
  }

  return results;
};
