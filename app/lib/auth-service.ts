import { currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Could not get user");
  }

  const user = await prisma.user.findUnique({
    where: {
      userName: self.username,
    },
  });

  if (!user) {
    throw new Error("Could not get user");
  }

  return user;
};

export async function getSelfByUserName(userName: string) {
  const currentLoggedInUser = await getSelf();
  const user = await prisma.user.findUnique({
    where: {
      userName,
      id: currentLoggedInUser?.id,
    },
    select: {
      id: true,
      userName: true,
      bio: true,
      imageUrl: true,
      stream: {
        select: {
          id: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          name: true,
          thumbnailUrl: true,
        },
      },
      following: true,
      _count: {
        select: {
          following: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("Could not get user or you are not authorized");
  }

  return user;
}

export async function getUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      stream: true,
    },
  });

  return user;
}
