"use client";

import { ReactNode } from "react";
import {
  ClientSideSuspense,
  RoomProvider,
  LiveblocksProvider,
} from "@liveblocks/react/suspense";

const Room = ({
  children,
  roomId,
  fallback,
}: {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}) => {
  return (
    <LiveblocksProvider
      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY as string}
      authEndpoint={"/api/liveblocks-auth" as string}
      throttle={26}
    >
      <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
