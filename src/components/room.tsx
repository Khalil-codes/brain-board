"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

type Props = {
  children: ReactNode;
  id: string;
  fallback: NonNullable<ReactNode> | null;
};

export function Room({ children, id, fallback }: Props) {
  return (
    <LiveblocksProvider authEndpoint={"/api/liveblocks-auth"} throttle={16}>
      <RoomProvider id={id} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
