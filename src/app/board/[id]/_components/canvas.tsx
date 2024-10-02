"use client";

import React, { useCallback, useState } from "react";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import type { Id } from "@convex/_generated/dataModel";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@liveblocks/react/suspense";
import CursorsPresence from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

type Props = {
  id: Id<"boards">;
};

const Canvas = ({ id }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canRedo = useCanRedo();
  const canUndo = useCanUndo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);

      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info id={id} />
      <Participants />
      <Toolbar
        state={canvasState}
        setState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        onRedo={history.redo}
        onUndo={history.undo}
      />
      <svg
        className="h-full w-full"
        onWheel={onWheel}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}>
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
