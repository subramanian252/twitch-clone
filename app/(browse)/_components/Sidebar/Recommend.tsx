"use client";

import { useSideBar } from "@/store/use-sidebar";
import { Stream, User } from "@prisma/client";
import React from "react";
import UserItem, { UserItemSkeleton } from "./UserItem";

interface Props {
  data: (User & { stream: { isLive: boolean } | null })[];
}

function Recommend(props: Props) {
  const { data } = props;

  const { collapsed } = useSideBar((state) => state);

  const showLabel = !collapsed && data.length > 0;

  return (
    <div className="mt-2">
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            isLive={user.stream?.isLive as boolean}
          />
        ))}
      </ul>
    </div>
  );
}

export default Recommend;

export const RecommendSkeleton = ({}) => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
