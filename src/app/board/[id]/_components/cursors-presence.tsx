"use client";

import { useOthersConnectionIds } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Cursor from "./cursor";

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

const CursorsPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

export default CursorsPresence;
