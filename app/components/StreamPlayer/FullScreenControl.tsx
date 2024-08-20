import { Maximize, Minimize } from "lucide-react";
import React from "react";
import { Hint } from "../Hint";

interface Props {
  isFullScreen: boolean;
  onToggle: () => void;
}

function FullScreenControl(props: Props) {
  const { isFullScreen, onToggle } = props;

  const Icon = isFullScreen ? Minimize : Maximize;

  const label = isFullScreen ? "Minimize" : "Maximize";

  return (
    <div className="flex items-center justify-center gap-4">
      <Hint label={label}>
        <button
          onClick={onToggle}
          className="text-white p-1.5 hover:bg-white/10 rounded-lg"
        >
          <Icon />
        </button>
      </Hint>
    </div>
  );
}

export default FullScreenControl;
