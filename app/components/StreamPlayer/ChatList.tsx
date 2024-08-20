import { ReceivedChatMessage } from "@livekit/components-react";
import React from "react";

import { format } from "date-fns";
import { stringToColor } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

function ChatList(props: Props) {
  const { messages, isHidden } = props;

  if (isHidden || !messages.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground">
          {isHidden ? "Chat is hidden" : "Welcome to the chat"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((message, i) => {
        const color = stringToColor(message.from?.name || "");
        return (
          <div
            key={i}
            className="flex gap-2 p-2 items-center rounded-md hover:bg-white/5"
          >
            <p className="text-sm text-white/40">
              {format(message.timestamp, "HH:MM")}
            </p>
            <div className="flex flex-wrap items-baseline gap-1 grow">
              <p className="text-sm font-semibold whitespace-nowrap">
                <span className="truncate" style={{ color: color }}>
                  {message.from?.name}
                </span>
              </p>
              <p>
                <span className="text-sm break-all">{message.message}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatList;

export function ChatListSkeleton() {
  return (
    <div className="flex h-full items-center justify-center">
      <Skeleton className="w-1/2 h-6" />
    </div>
  );
}
