"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import React from "react";

interface Props {
  value: string;
}

function CopyButton(props: Props) {
  const { value } = props;

  const [isCopied, setIsCopied] = React.useState(false);

  const onCopy = () => {
    if (!value) return;
    setIsCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const Icon = isCopied ? CheckCheck : Copy;

  return (
    <Button
      variant={"ghost"}
      onClick={onCopy}
      size={"sm"}
      disabled={isCopied || !value}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}

export default CopyButton;
