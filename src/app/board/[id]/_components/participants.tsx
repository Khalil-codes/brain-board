import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Participants = () => {
  return (
    <div className="absolute right-2 top-2 flex items-center rounded-md bg-white p-3 shadow-md">
      List of users
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
