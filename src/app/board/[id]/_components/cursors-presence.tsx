"use client";

import {
  shallow,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Cursor from "./cursor";
import Path from "./layers/path";
import { colorToCSS } from "@/lib/utils";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} id={id} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      penColor: other.presence.penColor,
    }),
    shallow
  );

  return (
    <>
      {others.map(
        ([key, { pencilDraft, penColor }]) =>
          pencilDraft &&
          pencilDraft.length && (
            <Path
              key={key}
              x={0}
              y={0}
              points={pencilDraft}
              fill={penColor ? colorToCSS(penColor) : "#ccc"}
            />
          )
      )}
    </>
  );
};

const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
