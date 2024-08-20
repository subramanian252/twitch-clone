"use client";

import { Hint } from "@/app/components/Hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChatVariant, useChatSideBar } from "@/store/use-chatsidebar";
import { useSideBar } from "@/store/use-sidebar";
import {
  ArrowLeftFromLine,
  ArrowRightFromLine,
  MessagesSquare,
  Users,
} from "lucide-react";
import React from "react";

interface Props {}

function VariantToggle(props: Props) {
  const {} = props;

  const { variant, onCHangeVariant } = useChatSideBar((state) => state);

  const label = variant === ChatVariant.CHAT ? "Community" : "Chat";

  const Icon = variant === ChatVariant.CHAT ? Users : MessagesSquare;

  const onToggle = () => {
    const newVariant =
      variant === ChatVariant.CHAT ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
    onCHangeVariant(newVariant);
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

export default VariantToggle;
