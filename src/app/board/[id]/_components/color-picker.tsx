"use client";

import { colorToCSS } from "@/lib/utils";
import { Color } from "@/types/canvas";
import React from "react";

type Props = {
  onChange: (color: Color) => void;
};

const ColorPicker = ({ onChange }: Props) => {
  return (
    <div className="mr-2 grid grid-cols-4 items-center border-r border-neutral-200 pr-2">
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 198, b: 38 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 82, g: 82, b: 82 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
    </div>
  );
};

export default ColorPicker;

type ColorButtonProps = {
  onClick: (color: Color) => void;
  color: Color;
};

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="flex h-8 w-8 items-center justify-center transition"
      onClick={() => onClick(color)}>
      <div
        className="h-6 w-6 rounded-md outline outline-1 outline-neutral-300 hover:outline-2"
        style={{
          backgroundColor: colorToCSS(color),
        }}
      />
    </button>
  );
};
