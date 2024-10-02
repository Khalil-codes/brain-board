"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import React from "react";
import UserAvatar from "./user-avatar";
import { connectionIdToColor } from "@/lib/utils";

const MAX_USERS = 2;

const Participants = () => {
  const users = useOthers();
  const self = useSelf();
  const hasMoreUsers = users.length > MAX_USERS;

  return (
    <div className="absolute right-2 top-2 flex min-h-14 min-w-14 items-center rounded-md bg-white p-3 shadow-md">
      <div className="flex gap-1">
        {self && (
          <UserAvatar
            name={self.info.name.concat(" (you)")}
            src={self.info.image}
            key={self.connectionId}
            borderColor={connectionIdToColor(self.connectionId)}
            active
          />
        )}
        {users.slice(0, MAX_USERS).map((user) => (
          <UserAvatar
            key={user.connectionId}
            name={user.info.name}
            src={user.info.image}
            borderColor={connectionIdToColor(user.connectionId)}
          />
        ))}
        {hasMoreUsers && (
          <UserAvatar
            name={users.length - MAX_USERS + " more"}
            fallback={"+".concat(String(users.length - MAX_USERS))}
          />
        )}
      </div>
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute right-2 top-2 rounded-md shadow-md">
      <Skeleton className="h-14 w-36 bg-neutral-300" />
    </div>
  );
};

export default Participants;
