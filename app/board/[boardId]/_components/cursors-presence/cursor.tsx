"use client";

import { memo } from "react";
import { generateRandomColor } from "../../../../../lib/colors";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@liveblocks/react";

const Cursor = ({ connectionId }: { connectionId: number }) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Anonymous";

  if (!cursor) {
    return null;
  }

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: generateRandomColor(connectionId),
          color: generateRandomColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: generateRandomColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
};

export default memo(Cursor);
