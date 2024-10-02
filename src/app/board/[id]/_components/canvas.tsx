"use client";

import React, { useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import type { Id } from "@convex/_generated/dataModel";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useHistory } from "@liveblocks/react/suspense";

type Props = {
  id: Id<"boards">;
};

const Canvas = ({ id }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const history = useHistory();

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info id={id} />
      <Participants />
      <Toolbar
        state={canvasState}
        setState={setCanvasState}
        canRedo={history.canRedo()}
        canUndo={history.canUndo()}
        onRedo={history.redo}
        onUndo={history.undo}
      />
    </main>
  );
};

export default Canvas;
