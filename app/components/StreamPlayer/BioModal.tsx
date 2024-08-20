import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/app/actions/User";
import { toast } from "sonner";

interface Props {
  bio: string;
}

function BioModal(props: Props) {
  const { bio } = props;

  const ref = React.useRef<HTMLButtonElement>(null);

  const [value, setValue] = React.useState(bio);

  const [isPending, startTransition] = React.useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateUser({ bio: value })
        .then((data) => {
          toast.success(`updated  ${data.bio}`);
          ref.current?.click();
        })
        .catch(() => toast.error("could not update  bio"));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-auto" variant={"outline"}>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Your Bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="mt-2">
          <Textarea
            disabled={isPending}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a bio"
            className="resize-none"
            value={value || ""}
          />
          <div className="mt-4 flex justify-between">
            <DialogClose ref={ref} asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Update Bio
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BioModal;
