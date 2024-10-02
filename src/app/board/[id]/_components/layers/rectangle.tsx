import React from "react";
import { LayerProps } from "./types";
import { RectangleLayer } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

type Props = LayerProps<RectangleLayer>;

const Rectangle = ({
  id,
  layer,
  onLayerPointerDown,
  selectionColor,
}: Props) => {
  const { x, y, height, width, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onLayerPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
      fill={fill ? colorToCSS(fill) : "#ccc"}
    />
  );
};

export default Rectangle;
