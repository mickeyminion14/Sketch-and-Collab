import React from "react";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../../../../../../../lib/utils";

interface PathLayerProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
  id?: string;
}

const PathLayer = ({
  x,
  fill,
  points,
  y,
  onPointerDown,
  stroke,
}: PathLayerProps) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 8,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      fill={fill}
      stroke={stroke}
      x={0}
      y={0}
      strokeWidth={1}
    />
  );
};

export default PathLayer;
