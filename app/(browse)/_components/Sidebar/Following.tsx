"use client";
import { useSideBar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import React from "react";
import UserItem from "./UserItem";

interface Props {
  data: (Follow & { following: User & { stream: { isLive: boolean } } })[];
}

function Following(props: Props) {
  const { data } = props;

  const { collapsed } = useSideBar((state) => state);
  if (!data) return null;

  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="mt-2">
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Followers</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.id}
            user={follow.following}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
}

export default Following;
