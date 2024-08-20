import { WifiOff } from "lucide-react";
import React from "react";

interface Props {
  userName: string;
}

function OfflineVideo(props: Props) {
  const { userName } = props;

  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="w-20 h-20" />
      <p className="text-muted-foreground">
        <b>{userName}</b> is offline
      </p>
    </div>
  );
}

export default OfflineVideo;
