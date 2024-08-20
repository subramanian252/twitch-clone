import prisma from "@/app/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");
  if (!authorization) {
    return new Response("Error occured -- no authorization header", {
      status: 400,
    });
  }

  const event = await receiver.receive(body, authorization);

  if (event.event === "ingress_started") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: true,
      },
    });
  } else if (event.event === "ingress_ended") {
    await prisma.stream.update({
      where: {
        ingressId: event.ingressInfo?.ingressId,
      },
      data: {
        isLive: false,
      },
    });
  } else {
    console.log("unknown event");
  }

  return new Response("ok");
}
