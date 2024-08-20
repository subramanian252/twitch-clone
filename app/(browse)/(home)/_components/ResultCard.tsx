import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Thumbnail, { ThumbnailSkeleteon } from "./Thumbnail";
import UserAvatar, {
  UserAvatarSkeleton,
} from "../../_components/Sidebar/UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  stream: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    User:
      | User
      | null
      | {
          userName: string;
          imageUrl: string | null;
          id: string;
        };
  };
}

function ResultCard(props: Props) {
  const { stream } = props;

  return (
    <Link href={`/${stream.User?.userName}`}>
      <div className="h-full w-full space-y-4  ">
        <Thumbnail
          src={stream.thumbnailUrl}
          fallback={stream.User?.imageUrl as string}
          isLive={stream.isLive}
          userName={stream.User?.userName as string}
        />

        <div className="flex gap-3">
          <UserAvatar
            userName={stream.User?.userName as string}
            isLive={stream.isLive}
            imageUrl={stream.User?.imageUrl as string}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate font-semibold hover:text-blue-600 ">
              {stream.name}
            </p>
            <p className="text-muted-foreground">{stream.User?.userName}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ResultCard;

export function ResultCardSkeleton() {
  return (
    <div className="h-full w-full space-y-4">
      <ThumbnailSkeleteon />
      <div className="flex gap-x-3">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}
