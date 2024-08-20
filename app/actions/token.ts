"use server";

import { v4 } from "uuid";
import { getSelf, getUserById } from "../lib/auth-service";
import { isBlockedByTheUser } from "../lib/block-service";
import { AccessToken } from "livekit-server-sdk";

export async function createViewerToken(hostIdentity: string) {
  let self;

  try {
    self = await getSelf();
  } catch {
    const id = v4();
    const userName = `guest-${Math.floor(Math.random() * 1000)}`;
    self = {
      id,
      userName,
    };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error("Could not get host");
  }

  const isBlocked = await isBlockedByTheUser(host.id);

  if (isBlocked) {
    throw new Error("User is blocked");
  }

  const isHost = host.id === self.id;

  const token = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.userName,
    }
  );

  token.addGrant({
    roomJoin: true,
    room: host.id,
    canPublish: true,
    canPublishData: true,
  });

  return await Promise.resolve(token.toJwt());
}
