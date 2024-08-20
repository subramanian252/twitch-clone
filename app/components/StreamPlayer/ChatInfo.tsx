import React, { useMemo } from "react";
import { Hint } from "../Hint";
import { Info } from "lucide-react";

interface Props {
  isDelayed: boolean;
  isFollowersOnly: boolean;
}

function ChatInfo(props: Props) {
  const { isDelayed, isFollowersOnly } = props;

  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only followers can chat";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Chat delayed by 3 seconds";
    }

    if (isFollowersOnly && isDelayed) {
      return "Only followers can chat, chat delayed by 3 seconds";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers only";
    }

    if (isDelayed && !isFollowersOnly) {
      return "Slow mode";
    }

    if (isFollowersOnly && isDelayed) {
      return "Followers only & slow mode";
    }

    return "";
  }, [isDelayed, isFollowersOnly]);

  if (!isDelayed && !isFollowersOnly) return null;

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint label={hint}>
        <Info className="h-4 w-4" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
}

export default ChatInfo;
