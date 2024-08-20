import { StreamPlayerSkeleton } from "@/app/components/StreamPlayer/StreamPlayer";
import React from "react";

interface Props {}

function Loading(props: Props) {
  const {} = props;

  return (
    <>
      <StreamPlayerSkeleton />
    </>
  );
}

export default Loading;
