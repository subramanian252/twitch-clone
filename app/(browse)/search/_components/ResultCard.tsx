import Link from "next/link";
import React from "react";
import Thumbnail, {
  ThumbnailSkeleteon,
} from "../../(home)/_components/Thumbnail";
import Verified from "@/app/components/StreamPlayer/verified";
import { formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  stream: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    User: null | {
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
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={stream.thumbnailUrl}
            fallback={stream.User?.imageUrl as string}
            isLive={stream.isLive}
            userName={stream.User?.userName as string}
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-600">
              {stream.User?.userName}
            </p>
            <Verified />
          </div>
          <p className="text-sm text-muted-foreground">{stream.name}</p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(stream.updatedAt))}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ResultCard;

export function ResultCardSkeleton() {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleteon />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-12" />
      </div>
    </div>
  );
}
