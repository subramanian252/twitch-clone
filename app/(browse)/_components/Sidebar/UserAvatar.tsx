import { User } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LiveBadge from "@/app/components/LiveBadge";
import { cva, VariantProps } from "class-variance-authority";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "w-8 h-8",
      lg: "w-14 h-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface Props extends VariantProps<typeof avatarSizes> {
  user?: User;
  isLive: boolean;
  showBadge?: boolean;
  imageUrl?: string;
  userName?: string;
}

function UserAvatar(props: Props) {
  const { user, isLive, showBadge, size, imageUrl, userName } = props;

  const canShowBadge = isLive && showBadge;

  return (
    <div className="relative">
      <Avatar
        className={cn(
          isLive &&
            "animate-pulse ring-2 ring-rose-500 border border-background",
          avatarSizes({ size })
        )}
      >
        <AvatarImage src={user?.imageUrl || imageUrl} alt="user" />
        <AvatarFallback>
          <span className="text-lg">{user?.userName[0] || userName}</span>
        </AvatarFallback>
      </Avatar>
      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2  -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  );
}

export default UserAvatar;

interface SkeletonProps extends VariantProps<typeof avatarSizes> {}

export const UserAvatarSkeleton = ({ size }: SkeletonProps) => {
  return <Skeleton className={cn(avatarSizes({ size }), "rounded-full")} />;
};
