import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";

import { useDebounceValue } from "usehooks-ts";
import CommunityItem from "./CommunityItem";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface Props {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

function ChatCommunity(props: Props) {
  const { viewerName, hostName, isHidden } = props;

  const [value, setValue] = useState("");

  const [debouncedValue, setDebouncedValue] = useDebounceValue(value, 500);

  const participants = useParticipants();
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }

      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLowerCase());
    });
  }, [participants, debouncedValue]);

  return (
    <div className="p-4">
      <Input
        value={value}
        onChange={onchange}
        className="border-white mb-4"
        placeholder="search Community"
      />
      <ScrollArea>
        <p className="text-center test-sm hidden last:block p-2">No results</p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            key={participant.identity}
            participantName={participant?.name!}
            viewerName={viewerName}
            hostName={hostName}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
}

export default ChatCommunity;
