import useSelectionBounds from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import ColorPicker from "./color-picker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

type Props = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

const SelectionTools = memo(({ camera, setLastUsedColor }: Props) => {
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");

      const indices: number[] = [];

      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }
      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], i);
      }
    },
    [selection]
  );

  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toImmutable();

      for (let i = 0; i < arr.length; i++) {
        if (selection.includes(arr[i])) {
          indices.push(i);
        }
      }
      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i)
        );
      }
    },
    [selection]
  );

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [selection, setLastUsedColor]
  );

  const deleteLayers = useDeleteLayers();

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute flex select-none rounded-xl border bg-white p-3 shadow-sm"
      style={{
        transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
      }}>
      <ColorPicker onChange={setFill} />
      <div className="flex flex-col gap-0.5">
        <Hint label="Bring Forward" side="top" sideOffset={10}>
          <Button variant="board" size="icon" onClick={moveToFront}>
            <BringToFront size={20} />
          </Button>
        </Hint>
        <Hint label="Send Backward" side="bottom" sideOffset={10}>
          <Button variant="board" size="icon" onClick={moveToBack}>
            <SendToBack size={20} />
          </Button>
        </Hint>
      </div>
      <div className="ml-2 flex items-center border-l border-neutral-200 pl-2">
        <Hint label="Delete" side="right" sideOffset={10}>
          <Button variant="board" size="icon" onClick={() => deleteLayers()}>
            <Trash2 size={20} />
          </Button>
        </Hint>
      </div>
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
