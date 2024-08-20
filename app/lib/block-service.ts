import { getSelf } from "./auth-service";
import prisma from "./db";

export async function isBlockedByTheUser(id: string) {
  try {
    const self = await getSelf();

    if (self.id === id) {
      return false;
    }

    const block = await prisma.block.findUnique({
      where: {
        blockerId_blockedid: {
          blockedid: self.id,
          blockerId: id,
        },
      },
    });

    return !!block;
  } catch {
    return false;
  }
}

export async function blockTheUser(id: string) {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("Could not get user");
  }

  if (self.id === otherUser.id) {
    throw new Error("Cannot block yourself");
  }

  const alreadyBlocked = await prisma.block.findUnique({
    where: {
      blockerId_blockedid: {
        blockedid: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (alreadyBlocked) {
    throw new Error("Already blocked");
  }

  const block = await prisma.block.create({
    data: {
      blockerId: self.id,
      blockedid: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
}

export async function unBlockTheUser(id: string) {
  const self = await getSelf();

  const otherUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("Could not get user");
  }

  if (self.id === otherUser.id) {
    throw new Error("Cannot unblock yourself");
  }

  const blocked = await prisma.block.findUnique({
    where: {
      blockerId_blockedid: {
        blockedid: otherUser.id,
        blockerId: self.id,
      },
    },
  });

  if (blocked) {
    const unblockeduser = await prisma.block.delete({
      where: {
        id: blocked.id,
      },
      include: {
        blocked: true,
      },
    });
    return unblockeduser;
  }
}

export const getBlockedUsers = async () => {
  const self = await getSelf();
  const blockedUsers = await prisma.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });
  return blockedUsers;
};
