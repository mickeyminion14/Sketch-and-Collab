import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const liveblocks = new Liveblocks({
  secret: process.env.NEXT_PUBLIC_LIVEBLOCKS_SECRET_KEY as string,
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  console.log("Authorization:", { authorization, user });

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();
  let board;
  try {
    board = await convex.query(api.queries.board.getById, {
      id: room,
    });
  } catch (error) {
    // redirect("/boards");
  }

  console.log("Room", {
    room,
    board,
    boardOrgId: board?.orgId,
    userOrgId: authorization.orgId,
  });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName,
    picture: user.imageUrl,
  };

  console.log("User Info:", { userInfo });

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { status, body } = await session.authorize();
  console.log("Liveblocks Authorization Status:", status);
  console.log("Liveblocks Authorization Body:", body);

  return new Response(body, { status });
}
