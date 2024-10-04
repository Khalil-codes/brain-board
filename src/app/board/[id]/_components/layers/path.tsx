import React from "react";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/lib/utils";

type Props = {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
};

const Path = ({ x, y, onPointerDown, stroke, fill, points }: Props) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      fill={fill}
      stroke={stroke || "transparent"}
      strokeWidth={1}
    />
  );
};

export default Path;
