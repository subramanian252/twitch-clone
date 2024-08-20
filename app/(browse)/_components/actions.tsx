"use client";

import { onBlock, onUnBlock } from "@/app/actions/Block";
import { onFollow, onUnFollow } from "../../actions/Follow";
import { isFollowing } from "@/app/lib/follow-service";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
  isFollowingUser: boolean;
}

function ActionsButton(props: Props) {
  const { userId } = props;
  const [isPending, startTransition] = useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then((data) =>
          toast.success(`followed the ${data?.following?.userName}`)
        )
        .catch(() => toast.error("could not follow the user"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then((data) =>
          toast.success(`unfollowed the ${data?.following?.userName}`)
        )
        .catch(() => toast.error("could not unfollow the user"));
    });
  };

  const onClick = () => {
    if (props.isFollowingUser) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then((data) =>
          toast.success(`bkocked the user ${data?.blocked?.userName}`)
        )
        .catch(() => toast.error("could not unfollow the user"));
    });
  };

  return (
    <>
      <Button onClick={onClick} disabled={isPending} variant={"primary"}>
        {props.isFollowingUser ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock}>Block</Button>
    </>
  );
}

export default ActionsButton;
