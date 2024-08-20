"use server";

import { followUser, unFollowUser } from "@/app/lib/follow-service";
import { revalidatePath } from "next/cache";

export async function onFollow(id: string) {
  try {
    const follow = await followUser(id);

    revalidatePath("/");

    if (follow) {
      revalidatePath(`/${follow?.following?.userName}`);
    }

    return follow;
  } catch {
    throw new Error("Internal Error");
  }
}

export async function onUnFollow(id: string) {
  try {
    const unfollowUser = await unFollowUser(id);

    revalidatePath("/");

    if (unfollowUser) {
      revalidatePath(`/${unfollowUser?.following?.userName}`);
    }
    return unfollowUser;
  } catch (err) {
    console.error(err);
    throw new Error("Internal Error");
  }
}
