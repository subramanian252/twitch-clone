"use client";

import React, { useState } from "react";
import CopyButton from "./CopyButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  value: string;
}

function KeyCard(props: Props) {
  const { value } = props;

  const [show, setShow] = useState(false);

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-start  gap-x-10">
        <p className="font-semibold shrink-0 mt-1">Stream Key</p>
        <div className=" w-full flex flex-col gap-y-2 items-start">
          <div className="w-full flex items-center gap-x-2 flex-1">
            <Input
              type={show ? "text" : "password"}
              value={value || ""}
              disabled
              placeholder="Stream Key"
            />
            <CopyButton value={value} />
          </div>
          <Button onClick={() => setShow(!show)} size={"sm"} variant="link">
            Show
          </Button>
        </div>
      </div>
    </div>
  );
}

export default KeyCard;
