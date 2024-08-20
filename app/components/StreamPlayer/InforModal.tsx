import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateStream } from "@/app/actions/stream";
import { toast } from "sonner";
import { UploadDropzone } from "@/app/lib/uploadthing";
import { Trash } from "lucide-react";
import { Hint } from "../Hint";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  initialName: string | null;
  initialThumbnailUrl: string | null;
}

function InforModal(props: Props) {
  const { initialName, initialThumbnailUrl } = props;

  const [value, setValue] = useState(initialName || "");

  const router = useRouter();

  const [isPending, startTransition] = React.useTransition();

  const ref = React.useRef<HTMLButtonElement>(null);

  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateStream({ name: value })
        .then((data) => {
          toast.success(`updated stream ${data.name}`);
          ref.current?.click();
        })
        .catch(() => toast.error("could not update stream info"));
    });
  };

  const onRemoveThumbnail = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then((data) => {
          toast.success(`removed thumbnail`);
          setThumbnailUrl("");
          ref.current?.click();
        })
        .catch(() => toast.error("could not remove thumbnail"));
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
          <DialogTitle>Edit Stream Info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              className="mb-4"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <Label className="mt-2">Thumbnail</Label>
          {thumbnailUrl ? (
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
              <div className="absolute top-2 right-2 z-[10]">
                <Hint label="delete thumbnail">
                  <Button
                    type="button"
                    disabled={isPending}
                    onClick={onRemoveThumbnail}
                    className="h-auto w-auto p-1.5"
                  >
                    <Trash className="w-6 h-6" />
                  </Button>
                </Hint>
              </div>
              <Image
                src={thumbnailUrl}
                alt="thumbnail"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border outline-dashed outline-muted">
              <UploadDropzone
                endpoint="thumbnailUploader"
                onClientUploadComplete={(res) => {
                  setThumbnailUrl(res?.[0]?.url);
                  ref.current?.click();
                  router.refresh();
                }}
              />
            </div>
          )}

          <div className="flex justify-between">
            <DialogClose ref={ref} asChild>
              <Button variant={"outline"}>Cancel</Button>
            </DialogClose>
            <Button variant={"primary"} type="submit" disabled={isPending}>
              Update
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InforModal;
