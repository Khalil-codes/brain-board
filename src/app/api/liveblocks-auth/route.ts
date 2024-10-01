import { auth, currentUser } from "@clerk/nextjs/server";
import { api } from "@convex/_generated/api";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVE_BLOCKS_SECRET_KEY!,
});

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const POST = async (request: Request) => {
  const authorizarion = auth();
  const user = await currentUser();

  if (!user || !authorizarion) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { room } = await request.json();

  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorizarion.orgId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    image: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();

  return new Response(body, { status });
};
