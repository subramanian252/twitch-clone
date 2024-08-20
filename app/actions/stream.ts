"use server";

import { Stream } from "@prisma/client";
import { getSelf } from "../lib/auth-service";
import prisma from "../lib/db";
import { revalidatePath } from "next/cache";

export async function updateStream(values: Partial<Stream>) {
  try {
    const self = await getSelf();
    const selfStream = await prisma.stream.findUnique({
      where: {
        userId: self.id,
      },
    });

    if (!selfStream) {
      throw new Error("No stream found");
    }

    const validData = {
      thumbnailUrl: values.thumbnailUrl,
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatDelayed: values.isChatDelayed,
      isChatFollowersOnly: values.isChatFollowersOnly,
    };

    const stream = await prisma.stream.update({
      where: {
        userId: self.id,
      },
      data: { ...validData },
    });

    revalidatePath(`/u/${self.userName}/chat`);
    revalidatePath(`/u/${self.userName}`);
    revalidatePath(`/${self.userName}`);

    return stream;
  } catch (err) {
    console.error(err);
    throw new Error("Error occured");
  }
}
