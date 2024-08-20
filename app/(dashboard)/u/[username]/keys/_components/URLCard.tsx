import { Input } from "@/components/ui/input";
import React from "react";
import CopyButton from "./CopyButton";

interface Props {
  value: string;
}

function URLCard(props: Props) {
  const { value } = props;

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center gap-x-10">
        <p className="font-semibold shrink-0">Server URL</p>
        <div className="w-full flex items-center gap-x-2">
          <Input value={value || ""} disabled placeholder="click generate" />
          <CopyButton value={value} />
        </div>
      </div>
    </div>
  );
}

export default URLCard;
