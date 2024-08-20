import UserAvatar, {
  UserAvatarSkeleton,
} from "@/app/(browse)/_components/Sidebar/UserAvatar";
import React from "react";
import Verified from "./verified";
import {
  useParticipants,
  useRemoteParticipant,
} from "@livekit/components-react";
import { UserIcon } from "lucide-react";
import Actions, { ActionSkeleton } from "./Actions";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  name: string;
  isFollowing: boolean;
  hostName: string;
  viewerIdentity: string;
  imageUrl: string;
  hostIdentity: string;
}

function Header(props: Props) {
  const {} = props;

  const participants = useParticipants();

  const particpant = useRemoteParticipant(props.hostIdentity);

  const isLive = !!particpant;

  const participantCount = participants.length - 1;

  const hostAsViewer = `host-${props.hostIdentity}`;

  const isHost = hostAsViewer === props.viewerIdentity;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-4">
        <UserAvatar
          imageUrl={props.imageUrl}
          isLive={isLive}
          showBadge
          size={"lg"}
          userName={props.hostName}
        />
        <div className="space-y-2">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{props.hostName}</h2>
            <Verified />
          </div>
          <p>{props.name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500 ">
              <UserIcon className="w-4 h-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground font-semibold">offline</p>
          )}
        </div>
      </div>
      <Actions
        isFollowing={props.isFollowing}
        isHost={isHost}
        hostIdentity={props.hostIdentity}
      />
    </div>
  );
}

export default Header;

export function HeaderSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
      <div className="flex items-center gap-x-4">
        <UserAvatarSkeleton size={"lg"} />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionSkeleton />
    </div>
  );
}
