import prisma from "./db";

export async function getStreamByUserId(id: string) {
  const stream = await prisma.stream.findUnique({
    where: {
      userId: id,
    },
  });
  if (!stream) {
    throw new Error("stream not found");
  }
  return stream;
}
