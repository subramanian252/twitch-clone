"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Stream, User } from "@prisma/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import UserAvatar from "./UserAvatar";
import { useSideBar } from "@/store/use-sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import LiveBadge from "@/app/components/LiveBadge";

interface Props {
  user: User & { stream: { isLive: boolean } | null };
  isLive: boolean;
}

function UserItem(props: Props) {
  const { user, isLive } = props;

  const pathName = usePathname();
  const href = "/" + user.userName;

  const { collapsed } = useSideBar((state) => state);

  const isActive = pathName === href;

  return (
    <Button
      asChild
      variant={"ghost"}
      className={cn("w-full h-12", isActive && "bg-accent")}
    >
      <Link href={href}>
        <div
          className={cn(
            "flex items-center w-full gap-x-4",
            collapsed && "justify-center"
          )}
        >
          <UserAvatar
            user={user}
            isLive={user.stream?.isLive as boolean}
            showBadge={user.stream?.isLive}
          />
          {!collapsed && <span className="truncate">{user.userName}</span>}
          {!collapsed && isLive && <LiveBadge className={"ml-auto"} />}
        </div>
      </Link>
    </Button>
  );
}

export default UserItem;

interface SkeletonProps {}

export const UserItemSkeleton = ({}: SkeletonProps) => {
  const { collapsed } = useSideBar((state) => state);
  return (
    <li className="flex items-center  gap-x-4 px-3 py-2">
      <Skeleton className={"min-h-[32px] min-w-[32px] rounded-full"} />
      {!collapsed && (
        <div className="flex-1">
          <Skeleton className="h-4 w-6/7" />
        </div>
      )}
    </li>
  );
};
