import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import ChatInfo from "./ChatInfo";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  onSubmit: () => void;
  onChange: (value: string) => void;
  value: string;
  isHidden: boolean;
  isFollowing: boolean;
  isChatFollowersOnly: boolean;
  isChatDelayed: boolean;
}

function ChatForm(props: Props) {
  const {
    onSubmit,
    onChange,
    value,
    isHidden,
    isFollowing,
    isChatFollowersOnly,
    isChatDelayed,
  } = props;

  const [isDelayBlocked, setIsDelayBlocked] = React.useState(false);

  const isFollowersOnlyAndNotFollowing = isChatFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isFollowersOnlyAndNotFollowing || isDelayBlocked;

  const handeleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    e.stopPropagation();

    if (!value || isDisabled) return;

    if (isChatDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmit();
      }, 3000);
    } else {
      onSubmit();
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <form
      onSubmit={handeleSubmit}
      className="flex flex-col items-center gap-y-4 p-3"
    >
      <div className="w-full">
        <ChatInfo
          isDelayed={isChatDelayed}
          isFollowersOnly={isChatFollowersOnly}
        />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder="Type a message"
          className={cn(
            "border-white/10",
            (isChatFollowersOnly || isChatDelayed) &&
              "rounded-t-none border-t-0"
          )}
          disabled={isDisabled}
        />
      </div>
      <div className="ml-auto">
        <Button
          disabled={isDisabled}
          variant={"primary"}
          type="submit"
          size="sm"
        >
          Send
        </Button>
      </div>
    </form>
  );
}

export default ChatForm;

export function ChatFormSkeleton() {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}
