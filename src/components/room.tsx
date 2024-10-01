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
    <LiveblocksProvider
      publicApiKey={process.env.NEXT_PUBLIC_LIVE_BLOCKS_API_KEY!}>
      <RoomProvider id={id}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
