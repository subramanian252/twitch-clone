import { getSelfByUserName } from "@/app/lib/auth-service";
import React from "react";
import StreamPlayer from "../../../../components/StreamPlayer/StreamPlayer";
import { isFollowing } from "@/app/lib/follow-service";

interface Props {
  params: {
    username: string;
  };
}

async function Page(props: Props) {
  const { params } = props;

  const externalUser = await getSelfByUserName(params.username);

  const isFollowingUser = await isFollowing(externalUser.id);

  if (!externalUser || !externalUser.id || !externalUser.stream) {
    return <div className="h-full">User not found</div>;
  }

  return (
    <div className="h-full">
      <StreamPlayer
        user={externalUser}
        stream={externalUser.stream}
        isFollowing={isFollowingUser}
      />
    </div>
  );
}

export default Page;
