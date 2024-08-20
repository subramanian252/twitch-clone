import { getSelf } from "./auth-service";
import prisma from "./db";

export const getFollowers = async () => {
  try {
    const self = await getSelf();

    const followers = await prisma.follow.findMany({
      where: {
        followerId: self.id,
        following: {
          blocking: {
            none: {
              blockedid: self.id,
            },
          },
        },
      },
      include: {
        following: {
          include: {
            stream: {
              select: {
                isLive: true,
              },
            },
          },
        },
      },
    });

    return followers;
  } catch {
    return [];
  }
};

export const isFollowing = async (id: string) => {
  try {
    const self = await getSelf();

    const isFollowingUser = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!isFollowingUser) {
      throw new Error("Could not get user");
    }

    if (self.id === isFollowingUser.id) {
      return true;
    }

    const isFollowing = await prisma.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: isFollowingUser.id,
      },
    });

    return !!isFollowing;
  } catch {
    return false;
  }
};

export const followUser = async (id: string) => {
  const self = await getSelf();

  const isFollowingUser = await prisma.user.findFirst({
    where: {
      id,
    },
  });

  if (!isFollowingUser) {
    throw new Error("Could not get user");
  }

  if (self.id === isFollowingUser.id) {
    throw new Error("Cannot follow yourself");
  }

  const alreadyFollowing = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: isFollowingUser.id,
    },
  });

  if (alreadyFollowing) {
    throw new Error("Already following");
  }

  const followUser = await prisma.follow.create({
    data: {
      followerId: self.id,
      followingId: isFollowingUser.id,
    },
    include: {
      following: true,
      followers: true,
    },
  });

  return followUser;
};

export const unFollowUser = async (id: string) => {
  const self = await getSelf();

  const isFollowingUser = await prisma.follow.findFirst({
    where: {
      followerId: self.id,
      followingId: id,
    },
  });

  if (!isFollowingUser) {
    throw new Error("Could not get user");
  }

  if (self.id === isFollowingUser.id) {
    throw new Error("Cannot unfollow yourself");
  }

  const alreadyFollowing = await prisma.follow.delete({
    where: {
      id: isFollowingUser.id,
    },
    include: {
      following: true,
    },
  });

  return alreadyFollowing;
};
