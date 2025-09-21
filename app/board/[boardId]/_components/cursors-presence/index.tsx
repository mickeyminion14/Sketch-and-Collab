"use client";

import { useOthersConnectionIds } from "@liveblocks/react";
import React, { memo } from "react";
import Cursors from "./cursors";

const CursorsPresence = () => {
  return (
    <>
      {/** TODO : Draft Pencil */}
      <Cursors />
    </>
  );
};

export default memo(CursorsPresence);
