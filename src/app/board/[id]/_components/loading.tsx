import { Loader } from "lucide-react";
import React from "react";
import Info from "./info";
import Toolbar from "./toolbar";
import Participants from "./participants";

const CanvasLoading = () => {
  return (
    <main className="relative flex h-full w-full touch-none items-center justify-center bg-neutral-100">
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
      <Loader className="animate-spin text-muted-foreground" size={48} />
    </main>
  );
};

export default CanvasLoading;
