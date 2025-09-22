import React from "react";
import { TriangleLayer as ITriangleLayer } from "../../../../../../../types/canvas";
import { convertRgbToHex } from "../../../../../../../lib/colors";

interface TriangleProps {
  id: string;
  layer: ITriangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const TriangleLayer = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: TriangleProps) => {
  const { x, y, width, height, fill } = layer;
  const points = `
    ${width / 2},0 
    ${width},${height} 
    0,${height}
  `;
  return (
    <polygon
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      points={points}
      strokeWidth={1}
      fill={convertRgbToHex(fill) || "#e2e2e2"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default TriangleLayer;
