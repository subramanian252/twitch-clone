import { Button } from "@/components/ui/button";
import React from "react";
import URLCard from "./_components/URLCard";
import { getStreamByUserId } from "@/app/lib/stream-service";
import { getSelf } from "@/app/lib/auth-service";
import KeyCard from "./_components/KeyCard";
import ConnectModal from "./_components/ConnectModal";

interface Props {}

async function Page(props: Props) {
  const {} = props;

  const self = await getSelf();

  const stream = await getStreamByUserId(self.id);

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <h1 className="text-3xl font-bold">Keys & URLs</h1>
        <ConnectModal />
      </div>
      <div className="space-y-4">
        <URLCard value={stream?.serverUrl || ""} />
        <KeyCard value={stream?.streamKey || ""} />
      </div>
    </div>
  );
}

export default Page;
