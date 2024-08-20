import { Loader } from "lucide-react";
import React from "react";

interface Props {
  label: string;
}

function LoadingVideo(props: Props) {
  const { label } = props;

  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <Loader className="w-20 h-20 animate-spin" />
      <p className="text-muted-foreground">
        <b>{label}</b>
      </p>
    </div>
  );
}

export default LoadingVideo;
