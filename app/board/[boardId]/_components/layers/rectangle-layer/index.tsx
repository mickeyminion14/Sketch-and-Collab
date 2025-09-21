import React from "react";
import { RectangleLayer as IRectangleLayer } from "../../../../../../types/canvas";
import { convertRgbToHex } from "../../../../../../lib/colors";

interface RectangleProps {
  id: string;
  layer: IRectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const RectangleLayer = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: RectangleProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={convertRgbToHex(fill) || "#e2e2e2"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default RectangleLayer;
