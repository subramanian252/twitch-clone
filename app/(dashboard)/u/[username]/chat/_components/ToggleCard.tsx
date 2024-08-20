"use client";

import { updateStream } from "@/app/actions/stream";
import { Switch } from "@/components/ui/switch";
import React, { useTransition } from "react";
import { toast } from "sonner";

interface Props {
  label: string;
  value: boolean;
  field: "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";
}

function ToggleCard(props: Props) {
  const { label, value = false, field } = props;

  const [isPending, startTransitions] = useTransition();

  const onChange = () => {
    // TODO
    startTransitions(() => {
      updateStream({
        [field]: !value,
      })
        .then(() => toast.success(`updated ${label}`))
        .catch(() => toast.error("could not update the stream"));
    });
  };

  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            onCheckedChange={onChange}
            disabled={isPending}
            checked={value}
          >
            {value ? "on" : "off"}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default ToggleCard;
