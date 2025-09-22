"use client";

import { memo } from "react";
import { LayerType, Side, XYWH } from "../../../../../../types/canvas";
import { useSelf, useStorage } from "@liveblocks/react";
import { useSelectionBounds } from "../../../../../../hooks/use-selection-bounds";

const HANDLE_WIDTH = 8;

const SelectionBox = ({
  onResizeHandlePointerDown,
}: {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}) => {
  const layerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );
  const isShowingHandles = useStorage(
    (root) => layerId && root.layers.get(layerId)?.type !== LayerType.Path
  );
  const bounds = useSelectionBounds();

  if (!bounds) {
    return null;
  }

  return (
    <>
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles && (
        <>
          {/* left top */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top + Side.Left, bounds);
            }}
          />

          {/* top middle */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizeHandlePointerDown(Side.Top, bounds);
            }}
          />

          {/* top right */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Top + Side.Right, bounds);
            }}
          />

          {/* left middle */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Left, bounds);
            }}
          />

          {/* right middle */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ew-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Right, bounds);
            }}
          />

          {/* left bottom */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nesw-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds);
            }}
          />

          {/* bottom middle */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "ns-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Bottom, bounds);
            }}
          />

          {/* bottom right */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={0}
            y={0}
            style={{
              cursor: "nwse-resize",
              width: `${HANDLE_WIDTH}`,
              height: `${HANDLE_WIDTH}`,
              transform: `translate(${bounds.x + bounds.width - HANDLE_WIDTH / 2}px, ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px)`,
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              //add resize handler
              onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds);
            }}
          />
        </>
      )}
    </>
  );
};

export default memo(SelectionBox);
