import React from "react";
import { EllipseLayer as IEllipseLayer } from "../../../../../../../types/canvas";
import { convertRgbToHex } from "../../../../../../../lib/colors";

interface EllipseProps {
  id: string;
  layer: IEllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const EllipseLayer = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: EllipseProps) => {
  const { x, y, width, height, fill } = layer;
  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      fill={convertRgbToHex(fill) || "#e2e2e2"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default EllipseLayer;
