import { isFollowing } from "@/app/lib/follow-service";
import React from "react";
import ActionsButton from "../_components/actions";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { isBlockedByTheUser } from "@/app/lib/block-service";
import StreamPlayer from "@/app/components/StreamPlayer/StreamPlayer";

interface Props {
  params: {
    username: string;
  };
}

async function Page(props: Props) {
  const { params } = props;

  const data = await prisma.user.findUnique({
    where: {
      userName: params.username,
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

  if (!data || !data.stream) {
    notFound();
  }

  const isFollowingUser = await isFollowing(data.id);

  const isBlockedByThisUSer = await isBlockedByTheUser(data.id);

  if (isBlockedByThisUSer) {
    return notFound();
  }

  return (
    <StreamPlayer
      user={data}
      isFollowing={isFollowingUser}
      stream={data.stream}
    />
  );
}

export default Page;
