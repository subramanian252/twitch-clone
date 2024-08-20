"use client";

import { ChatVariant, useChatSideBar } from "@/store/use-chatsidebar";
import {
  useChat,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import ChatToggle from "./ChatToggle";
import VariantToggle from "./VariantToggle";
import ChatForm, { ChatFormSkeleton } from "./ChatForm";
import ChatList, { ChatListSkeleton } from "./ChatList";
import ChatCommunity from "./ChatCommunity";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  viewerName: string;
  hostName: string;
  hostIdentity: string;
  isFollowing: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowingOnly: boolean;
}

function Chat(props: Props) {
  const {
    viewerName,
    hostName,
    hostIdentity,
    isFollowing,
    isChatEnabled,
    isChatDelayed,
    isChatFollowingOnly,
  } = props;
  const matches = useMediaQuery("(max-width: 1024px)");

  const { variant, onExpand } = useChatSideBar((state) => state);

  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);

  const isOnline = participant && connectionState === ConnectionState.Connected;

  const isHidden = !isChatEnabled || !isOnline;

  const [value, setValue] = useState("");

  const { chatMessages: messages, send } = useChat();

  const reversedMessages = useMemo(() => {
    return messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  const onSubmit = () => {
    if (!send) return;

    send(value);
    setValue("");
  };

  const onChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (matches) {
      onExpand();
    }
  }, [matches, onExpand]);

  return (
    <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh-64px)]">
      <div className="relative p-3 border-b flex items-center ">
        <div className="hidden lg:block">
          <ChatToggle />
        </div>
        <p className="font-semibold text-primary text-center flex-1">
          Stream Chat
        </p>
        <VariantToggle />
      </div>
      {variant === ChatVariant.CHAT ? (
        <>
          <ChatList messages={reversedMessages} isHidden={isHidden} />
          <ChatForm
            onSubmit={onSubmit}
            onChange={onChange}
            value={value}
            isHidden={isHidden}
            isChatFollowersOnly={isChatFollowingOnly}
            isChatDelayed={isChatDelayed}
            isFollowing={isFollowing}
          />
        </>
      ) : (
        <>
          <ChatCommunity
            viewerName={viewerName}
            hostName={hostName}
            isHidden={isHidden}
          />
        </>
      )}
    </div>
  );
}

export default Chat;

export function ChatSkeleton() {
  return (
    <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
      <div className="relative p-3 border-b hidden md:block">
        <Skeleton className="h-6 w-6 left-3 top-3" />
        <Skeleton className="h-6 w-28 left-3 mx-auto" />
      </div>
      <ChatListSkeleton />
      <ChatFormSkeleton />
    </div>
  );
}
