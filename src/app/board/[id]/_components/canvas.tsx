"use client";

import React from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";

type Props = {
  id: string;
};

const Canvas = ({ id }: Props) => {
  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

export default Canvas;
