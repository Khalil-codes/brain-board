import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Info = () => {
  return (
    <div className="absolute left-2 top-2 flex items-center rounded-md bg-white p-3 shadow-md">
      Information about the board
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute left-2 top-2 rounded-md shadow-md">
      <Skeleton className="h-14 w-72 bg-neutral-300" />
    </div>
  );
};

export default Info;
