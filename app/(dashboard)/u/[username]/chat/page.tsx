import { getSelf } from "@/app/lib/auth-service";
import { getStreamByUserId } from "@/app/lib/stream-service";
import React from "react";
import ToggleCard from "./_components/ToggleCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

async function Page(props: Props) {
  const {} = props;

  const self = await getSelf();

  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("No stream found");
  }

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold">chat settings</h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
          field="isChatEnabled"
          label="Enable Chat"
          value={stream.isChatEnabled}
        />
        <ToggleCard
          field="isChatDelayed"
          label="Delay Chat"
          value={stream.isChatDelayed}
        />
        <ToggleCard
          field="isChatFollowersOnly"
          label="Must be followers Only"
          value={stream.isChatFollowersOnly}
        />
      </div>
    </div>
  );
}

export default Page;
