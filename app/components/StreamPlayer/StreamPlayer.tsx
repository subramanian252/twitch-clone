"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";
import React from "react";

import { LiveKitRoom } from "@livekit/components-react";
import Video, { VideoSkeleton } from "./Video";
import { useChatSideBar } from "@/store/use-chatsidebar";
import { cn } from "@/lib/utils";
import Chat, { ChatSkeleton } from "./Chat";
import ChatToggle from "./ChatToggle";
import Header, { HeaderSkeleton } from "./Header";
import InforCard from "./InforCard";
import AboutCard from "./AboutCard";

type CustomStream = {
  id: string;
  isLive: boolean;
  isChatEnabled: boolean;
  isChatDelayed: boolean;
  isChatFollowersOnly: boolean;
  name: string;
  thumbnailUrl: string | null;
};

type CustomUser = {
  id: string;
  userName: string;
  bio: string | null;
  imageUrl: string;
  stream: CustomStream | null;
  _count: {
    following: number;
  };
};

interface Props {
  user: CustomUser;
  stream: CustomStream;
  isFollowing: boolean;
}

function StreamPlayer(props: Props) {
  const { user, stream, isFollowing } = props;

  const { token, name, identity } = useViewerToken(user.id);

  const { collapsed } = useChatSideBar((state) => state);

  if (!user) {
    return <div>Loading User</div>;
  }

  if (!token || !name || !identity) {
    return <StreamPlayerSkeleton />;
  }

  return (
    <>
      {collapsed && (
        <div className="fixed top-[100px] right-2 z-50">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
        className={cn(
          "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
          collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}
      >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar">
          <Video hostName={user.userName} hostIdentity={user.id} />
          <Header
            name={stream?.name || name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            hostName={user.userName}
            isFollowing={isFollowing}
            imageUrl={user.imageUrl}
          />
          <InforCard
            name={stream?.name || name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            thumbnailUrl={stream?.thumbnailUrl || ""}
          />
          <AboutCard
            hostName={user.userName}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio || ""}
            followersCount={user._count.following}
          />
        </div>
        <div className={cn("col-span-1", collapsed && "hidden")}>
          <Chat
            viewerName={name}
            hostName={user.userName}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream?.isChatEnabled!}
            isChatDelayed={stream?.isChatDelayed!}
            isChatFollowingOnly={stream?.isChatFollowersOnly!}
          />
        </div>
      </LiveKitRoom>
    </>
  );
}

export default StreamPlayer;

export function StreamPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
      <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
        <VideoSkeleton />
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  );
}
