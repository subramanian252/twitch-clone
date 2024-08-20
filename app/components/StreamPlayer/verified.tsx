import { Check } from "lucide-react";
import React from "react";

interface Props {}

function Verified(props: Props) {
  const {} = props;

  return (
    <div className="p-0.5 flex items-center h-4 justify-center rounded-full bg-blue-600">
      <Check className="w-[10px] h-[10px] text-primary stroke-[4px]" />
    </div>
  );
}

export default Verified;
