import React from "react";
import { LayerProps } from "./types";
import { EllipseLayer } from "@/types/canvas";
import { colorToCSS } from "@/lib/utils";

type Props = LayerProps<EllipseLayer>;

const Ellipse = ({ id, layer, selectionColor, onLayerPointerDown }: Props) => {
  const { x, y, height, width, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onLayerPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      stroke={selectionColor || "transparent"}
      fill={fill ? colorToCSS(fill) : "rgb(204, 204, 204)"}
    />
  );
};

export default Ellipse;
