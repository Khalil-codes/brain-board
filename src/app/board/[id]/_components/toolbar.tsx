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
import { CanvasState } from "@/types/canvas";

type Props = {
  state: CanvasState;
  setState: (newState: CanvasState) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const Toolbar = ({ onRedo, onUndo, canRedo, canUndo }: Props) => {
  return (
    <div className="absolute left-2 top-1/2 flex -translate-y-1/2 flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-2 shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => {}}
          isActive={true}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
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
