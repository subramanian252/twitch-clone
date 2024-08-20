import React from "react";
import UserAvatar from "../../_components/Sidebar/UserAvatar";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import LiveBadge from "@/app/components/LiveBadge";

interface Props {
  src: string | null;
  fallback: string | null;
  isLive: boolean;
  userName: string;
}

function Thumbnail(props: Props) {
  const { src, fallback, isLive, userName } = props;

  let content;

  if (!src) {
    content = (
      <div className="bg-background flex flex-col items-center justify-center gap-y-4 h-full w-full rounded-md group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform">
        <UserAvatar
          userName={userName}
          isLive={isLive}
          showBadge
          size={"lg"}
          imageUrl={fallback as string}
        />
      </div>
    );
  } else {
    content = (
      <Image
        src={src}
        alt="thumbnail"
        fill
        className="rounded-md object-cover"
      />
    );
  }

  return (
    <div className="group aspect-video relative rounded-md cursor-pointer ">
      <div className="rounded-md absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity" />
      {content}
      {isLive && src && (
        <div className="absolute top-2 left-2 group-hover:translate-x-2 group-hover:-translate-y-1 transition-transform">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

export default Thumbnail;

export const ThumbnailSkeleteon = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
