import React from "react";
import { Kalam } from "next/font/google";
import { LayerProps } from "./types";
import { TextLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToCSS } from "@/lib/utils";
import { useMutation } from "@liveblocks/react/suspense";

type Props = LayerProps<TextLayer>;

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scalteFactor = 0.5;

  const fontSize = Math.min(
    scalteFactor * height,
    scalteFactor * width,
    maxFontSize,
    Math.sqrt(width * width + height * height) * scalteFactor
  );

  return fontSize;
};

const Text = ({ layer, id, onLayerPointerDown, selectionColor }: Props) => {
  const { x, y, width, height, fill, value } = layer;

  const updateValue = useMutation(({ storage }, newValue) => {
    const liveLayers = storage.get("layers");
    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onLayerPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}>
      <ContentEditable
        html={value || "Text"}
        className={cn(
          "flex h-full w-full items-center justify-center text-center outline-none drop-shadow-md",
          font.className
        )}
        style={{
          fontSize: `${calculateFontSize(width, height)}px`,
          color: fill ? colorToCSS(fill) : "#000",
        }}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};

export default Text;
