import React from "react";
import { Kalam } from "next/font/google";
import { LayerProps } from "./types";
import { NoteLayer } from "@/types/canvas";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn, colorToCSS, getContrastingTextColor } from "@/lib/utils";
import { useMutation } from "@liveblocks/react/suspense";

type Props = LayerProps<NoteLayer>;

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scalteFactor = 0.15;

  const fontSize = Math.min(
    scalteFactor * height,
    scalteFactor * width,
    maxFontSize,
    Math.sqrt(width * width + height * height) * scalteFactor
  );

  return fontSize;
};

const Note = ({ layer, id, onLayerPointerDown, selectionColor }: Props) => {
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
        backgroundColor: fill ? colorToCSS(fill) : "#CCC",
      }}
      className="relative shadow-md drop-shadow-xl">
      {/* <div className="absolute right-0 top-0 border-b-[25px] border-r-[25px] border-b-[#ccc] border-r-neutral-100" /> */}
      <ContentEditable
        html={value || "Text"}
        className={cn(
          "flex h-full w-full items-center justify-center text-center outline-none",
          font.className
        )}
        style={{
          fontSize: `${calculateFontSize(width, height)}px`,
          color: fill ? getContrastingTextColor(fill) : "#000",
        }}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};

export default Note;
