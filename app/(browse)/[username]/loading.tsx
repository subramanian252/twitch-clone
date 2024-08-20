import { StreamPlayerSkeleton } from "@/app/components/StreamPlayer/StreamPlayer";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <div>
      <StreamPlayerSkeleton />
    </div>
  );
}

export default Loading;
