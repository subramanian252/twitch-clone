import { cn, stringToColor } from "@/lib/utils";
import { hostname } from "os";
import React from "react";
import { Hint } from "../Hint";
import { Button } from "@/components/ui/button";
import { MinusCircle } from "lucide-react";
import { onBlock } from "@/app/actions/Block";
import { toast } from "sonner";

interface Props {
  participantName: string | null;
  viewerName: string;
  hostName: string;
  participantIdentity: string;
}

function CommunityItem(props: Props) {
  const { participantName, viewerName, hostName, participantIdentity } = props;

  const color = stringToColor(participantName || "");

  const [isPending, startTransition] = React.useTransition();

  const isSelf = participantName === viewerName;
  const isHost = viewerName === hostName;

  const handleBlock = () => {
    startTransition(() => {
      onBlock(participantIdentity)
        .then(() => {
          toast.success(`bkocked the user ${participantIdentity}`);
        })
        .catch(() => toast.error("could not block the user"));
    });
  };

  return (
    <div
      className={cn(
        "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5"
      )}
    >
      <p style={{ color: color }}>{participantName}</p>
      {isHost && !isSelf && (
        <Hint label="block">
          <Button
            disabled={isPending}
            onClick={handleBlock}
            className="h-auto w-auto p-1 opacity-0 group-hover:opacity-100"
          >
            <MinusCircle className="w-4 h-4" />
          </Button>
        </Hint>
      )}
    </div>
  );
}

export default CommunityItem;
