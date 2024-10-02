"use client";

import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import type { Id } from "@convex/_generated/dataModel";

type Props = {
  id: Id<"boards">;
};

const Canvas = ({ id }: Props) => {
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info id={id} />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
