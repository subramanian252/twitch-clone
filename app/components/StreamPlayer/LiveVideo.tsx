import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import React from "react";
import FullScreenControl from "./FullScreenControl";
import { useEventListener } from "usehooks-ts";
import VolumeControls from "./volumeControls";

interface Props {
  participant: Participant;
}

function LiveVideo(props: Props) {
  const { participant } = props;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const WrapperRef = React.useRef<HTMLDivElement>(null);

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [volume, setVolume] = React.useState(50);

  const onVolumeChange = (value: number) => {
    setVolume(+value);

    if (videoRef.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else if (WrapperRef.current) {
      WrapperRef.current.requestFullscreen();
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullScreen = document.fullscreenElement !== null;
    setIsFullScreen(isCurrentlyFullScreen);
  };

  useEventListener("fullscreenchange", handleFullScreenChange, WrapperRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => {
      return track.participant.identity === participant.identity;
    })
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  return (
    <div ref={WrapperRef} className="h-full flex relative">
      <video ref={videoRef} width={"100%"} height={"100%"} />
      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControls
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullScreenControl
            isFullScreen={isFullScreen}
            onToggle={toggleFullScreen}
          />
        </div>
      </div>
    </div>
  );
}

export default LiveVideo;
