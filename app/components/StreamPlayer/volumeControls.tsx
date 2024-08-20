import { Volume1, Volume2, VolumeX } from "lucide-react";
import React from "react";
import { Hint } from "../Hint";
import { Slider } from "@/components/ui/slider";

interface Props {
  onToggle: () => void;
  onChange: (value: number) => void;
  value: number;
}

function VolumeControls(props: Props) {
  const { onToggle, onChange, value } = props;

  const isMuted = value === 0;
  const isAboveHalf = value > 50;

  let Icon = Volume1;

  if (isMuted) {
    Icon = VolumeX;
  } else if (isAboveHalf) {
    Icon = Volume2;
  }

  const label = isMuted ? "Unmute" : "Mute";

  const HandleChange = (value: number[]) => {
    onChange(value[0]);
  };

  return (
    <div className="flex items-center gap-2">
      <Hint label={label} asChild>
        <button
          onClick={onToggle}
          className="text-white hover:bg-white/10 p-1.5 rounded-lg"
        >
          <Icon className="h-6 w-6" />
        </button>
      </Hint>
      <Slider
        className="w-[8rem] cursor-pointer"
        onValueChange={HandleChange}
        value={[value]}
        max={100}
        step={1}
      />
    </div>
  );
}

export default VolumeControls;
