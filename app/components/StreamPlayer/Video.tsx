import { ConnectionState, Track } from "livekit-client";

import {
  useTracks,
  useConnectionState,
  useRemoteParticipant,
} from "@livekit/components-react";
import React from "react";
import OfflineVideo from "./OfflineVideo";
import LoadingVideo from "./LoadingVideo";
import LiveVideo from "./LiveVideo";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  hostName: string;
  hostIdentity: string;
}

function Video(props: Props) {
  const { hostName, hostIdentity } = props;

  const connectonState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity);
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
  ]).filter((track) => {
    return track.participant.identity === hostIdentity;
  });

  let content;

  if (!participant && connectonState === ConnectionState.Connected) {
    content = <OfflineVideo userName={hostName} />;
  } else if (!participant || tracks.length === 0) {
    content = <LoadingVideo label={connectonState} />;
  } else {
    content = <LiveVideo participant={participant} />;
  }

  return <div className="aspect-video border-b group relative ">{content}</div>;
}

export default Video;

export function VideoSkeleton() {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
}
