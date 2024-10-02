import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import ToolButton from "./tool-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas";

type Props = {
  state: CanvasState;
  setState: (newState: CanvasState) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const Toolbar = ({
  onRedo,
  onUndo,
  canRedo,
  canUndo,
  state,
  setState,
}: Props) => {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-2 shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => setState({ mode: CanvasMode.None })}
          isActive={
            state.mode === CanvasMode.None ||
            state.mode === CanvasMode.Translating ||
            state.mode === CanvasMode.SelectionNet ||
            state.mode === CanvasMode.Pressing ||
            state.mode === CanvasMode.Resizing
          }
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() =>
            setState({ mode: CanvasMode.Inserting, layerType: LayerType.Text })
          }
          isActive={
            state.mode === CanvasMode.Inserting &&
            state.layerType === LayerType.Text
          }
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() =>
            setState({ mode: CanvasMode.Inserting, layerType: LayerType.Note })
          }
          isActive={
            state.mode === CanvasMode.Inserting &&
            state.layerType === LayerType.Note
          }
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() =>
            setState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          isActive={
            state.mode === CanvasMode.Inserting &&
            state.layerType === LayerType.Rectangle
          }
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() =>
            setState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          isActive={
            state.mode === CanvasMode.Inserting &&
            state.layerType === LayerType.Ellipse
          }
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() =>
            setState({
              mode: CanvasMode.Pencil,
            })
          }
          isActive={state.mode === CanvasMode.Pencil}
        />
      </div>
      <div className="flex flex-col items-center rounded-md bg-white p-2 shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={onUndo}
          isActive={false}
          isDisabled={!canUndo}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={onRedo}
          isActive={false}
          isDisabled={!canRedo}
        />
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4 shadow-md">
      <Skeleton className="h-[22rem] w-14 bg-neutral-300" />
    </div>
  );
};

export default Toolbar;
