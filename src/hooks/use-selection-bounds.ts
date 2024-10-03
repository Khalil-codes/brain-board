import { Layer, XYWH } from "@/types/canvas";
import { shallow, useSelf, useStorage } from "@liveblocks/react/suspense";

const useSelectionBounds = () => {
  const selection = useSelf((me) => me.presence.selection);

  return useStorage((root) => {
    const selectionLayer = selection
      .map((layerId) => root.layers.get(layerId)!)
      .filter(Boolean);
    return boundingBox(selectionLayer);
  }, shallow);
};

export default useSelectionBounds;

const boundingBox = (layers: Layer[]) => {
  const first = layers[0];
  if (!layers.length || !first) return null;

  let left = first.x;
  let right = first.x + first.width;
  let top = first.y;
  let bottom = first.y + first.height;

  for (const { x, y, width, height } of layers) {
    left = Math.min(left, x);
    right = Math.max(right, x + width);
    top = Math.min(top, y);
    bottom = Math.max(bottom, y + height);
  }

  return {
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
  };
};
