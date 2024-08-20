"use server";

import { revalidatePath } from "next/cache";
import { blockTheUser, unBlockTheUser } from "../lib/block-service";
import { getSelf } from "../lib/auth-service";
import { RoomServiceClient } from "livekit-server-sdk";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function onBlock(id: string) {
  const self = await getSelf();

  let blockedUser;
  try {
    blockedUser = await blockTheUser(id);
  } catch {}

  try {
    await roomService.removeParticipant(self.id, id);
  } catch {}

  revalidatePath("/u/" + self.userName + "/community");

  return blockedUser;
}

export async function onUnBlock(id: string) {
  try {
    const self = await getSelf();
    const unBlock = await unBlockTheUser(id);

    revalidatePath("/");

    if (unBlock) {
      revalidatePath(`/u/${self.userName}/community`);
      revalidatePath(`/${unBlock?.blocked?.userName}`);
    }
    return unBlock;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
}
