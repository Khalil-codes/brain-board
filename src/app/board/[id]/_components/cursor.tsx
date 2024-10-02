"use client";

import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@liveblocks/react/suspense";
import { MousePointer2 } from "lucide-react";
import React, { memo } from "react";

type Props = {
  id: number;
};

const Cursor = memo(({ id }: Props) => {
  const other = useOther(id, (user) => user);
  const name = other?.info.name
    ? other.info.name.length > 10
      ? `${other.info.name.slice(0, 10)}...`
      : other.info.name
    : "Teammate";
  const cursor = other.presence.cursor;

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{ transform: `translate(${x}px, ${y}px)` }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md">
      <MousePointer2
        style={{
          fill: connectionIdToColor(id),
          color: connectionIdToColor(id),
        }}
      />
      <div
        className="absolute left-5 rounded px-1.5 py-0.5 text-xs font-semibold text-white"
        style={{ backgroundColor: connectionIdToColor(id) }}>
        {name}
      </div>
    </foreignObject>
  );
});

export default Cursor;
