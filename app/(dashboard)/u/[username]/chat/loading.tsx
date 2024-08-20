import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="space-y-4">
        <Skeleton className="rounded-xl w-full p-10" />;
        <Skeleton className="rounded-xl w-full p-10" />;
        <Skeleton className="rounded-xl w-full p-10" />;
      </div>
    </div>
  );
}

export default Loading;
