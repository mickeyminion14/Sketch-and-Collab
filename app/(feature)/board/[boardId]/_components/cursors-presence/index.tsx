"use client";

import {
  shallow,
  useOthers,
  useOthersConnectionIds,
  useOthersMapped,
} from "@liveblocks/react";
import React, { memo } from "react";
import Cursors from "./cursors";
import PathLayer from "../layers/path-layer";
import { convertRgbToHex } from "../../../../../../lib/colors";

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
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <PathLayer
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? convertRgbToHex(other.penColor) : "#000"}
            />
          );
        }
        return null;
      })}
    </>
  );
};

const CursorsPresence = () => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
};

export default memo(CursorsPresence);
