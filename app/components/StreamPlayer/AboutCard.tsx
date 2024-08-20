import React from "react";
import Verified from "./verified";
import BioModal from "./BioModal";

interface Props {
  followersCount: number;
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string;
}

function AboutCard(props: Props) {
  const { followersCount, hostName, hostIdentity, viewerIdentity, bio } = props;

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = hostAsViewer === viewerIdentity;

  const followedByLabel = followersCount > 1 ? "Followers" : "Follower";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <Verified />
          </div>
          {isHost && <BioModal bio={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">{followersCount}</span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user has not added a bio yet. Add one to get started."}
        </p>
      </div>
    </div>
  );
}

export default AboutCard;
