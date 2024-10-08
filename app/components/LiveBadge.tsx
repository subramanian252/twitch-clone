import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}

function LiveBadge(props: Props) {
  const { className } = props;

  return (
    <div
      className={cn(
        "bg-rose-500 text-center p-0.5 px-1.5 rounded-md uppercase text-[10px] tracking-wide border border-background",
        className
      )}
    >
      Live
    </div>
  );
}

export default LiveBadge;
