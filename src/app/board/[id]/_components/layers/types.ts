import { Layer } from "@/types/canvas";

export type LayerProps<T extends Layer> = {
  id: string;
  layer: T;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};
