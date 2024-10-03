import useSelectionBounds from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import ColorPicker from "./color-picker";

type Props = {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
};

const SelectionTools = memo(({ camera, setLastUsedColor }: Props) => {
  const selection = useSelf((me) => me.presence.selection);
  const selectionBounds = useSelectionBounds();

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
    </div>
  );
});

export default SelectionTools;
