"use client";

import { Hint } from "@/app/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatSideBar } from "@/store/use-chatsidebar";
import { useSideBar } from "@/store/use-sidebar";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import React from "react";

interface Props {}

function ChatToggle(props: Props) {
  const {} = props;

  const { collapsed, onCollapse, onExpand } = useChatSideBar((state) => state);

  const label = collapsed ? "Expand" : "Collapse";

  const Icon = collapsed ? ArrowRightFromLine : ArrowLeftFromLine;

  const onToggle = () => {
    if (collapsed) onExpand();
    else onCollapse();
  };

  return (
    <>
      <Hint label={label} asChild side="left">
        <Button
          onClick={onToggle}
          className="h-auto p-2 hover:bg-white/10 hover:text-primary"
          variant={"ghost"}
        >
          <Icon className="h-4 w-4" />
        </Button>
      </Hint>
    </>
  );
}

export default ChatToggle;
