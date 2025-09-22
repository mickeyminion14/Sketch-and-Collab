"use client";

import { useOthersConnectionIds } from "@liveblocks/react";
import Cursor from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

export default Cursors;
