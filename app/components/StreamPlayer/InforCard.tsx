import { Separator } from "@/components/ui/separator";
import { Pencil } from "lucide-react";
import Image from "next/image";
import React from "react";
import InforModal from "./InforModal";

interface Props {
  name: string | null;
  hostIdentity: string;
  viewerIdentity: string;
  thumbnailUrl: string;
}

function InforCard(props: Props) {
  const { name, hostIdentity, viewerIdentity, thumbnailUrl } = props;

  const hostAsViewer = `host-${hostIdentity}`;

  const isHost = hostAsViewer === viewerIdentity;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center gap-x-4 p-4 w-full">
          <div className="rounded-md bg-blue-600 p-2 h-1uto w-auto">
            <Pencil className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg capitalize font-semibold">
              Edit your stream info
            </h2>
            <p className="text-xs lg:text-sm text-muted-foreground">
              Maximize your visibility
            </p>
          </div>
          <InforModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 spacee-y-4">
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Stream Name</h3>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div className="mt-2">
            <h3 className="text-sm text-muted-foreground mt-2">Thumbnail</h3>
            {thumbnailUrl && (
              <div className="relative mt-2 aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  src={thumbnailUrl}
                  alt="thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InforCard;
