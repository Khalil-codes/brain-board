"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Rectangle from "./layers/rectangle";

type Props = {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: Props) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) {
      return null;
    }

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            layer={layer}
            id={id}
            onLayerPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
            key={id}
          />
        );
      default:
        console.warn("Unknown layer type detected");
        return null;
    }
  }
);

export default LayerPreview;
