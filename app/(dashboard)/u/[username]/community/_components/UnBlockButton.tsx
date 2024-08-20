import { onUnBlock } from "@/app/actions/Block";
import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

interface Props {
  userId: string;
}

function UnBlockButton(props: Props) {
  const { userId } = props;

  const [isPending, startTransition] = React.useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnBlock(userId)
        .then(() => {
          toast.success(`unblocked the user ${userId}`);
        })
        .catch(() => toast.error("could not unblock the user"));
    });
  };

  return (
    <Button disabled={isPending} onClick={onClick} variant="primary">
      Unblock
    </Button>
  );
}

export default UnBlockButton;
