"use client";

import React from "react";
import { Color, LayerType } from "../../../../../../types/canvas";
import { useStorage } from "@liveblocks/react";
import RectangleLayer from "../layers/rectangle-layer";
import EllipseLayer from "../layers/ellipse-layer";
import TriangleLayer from "../layers/triangle-layer";
import TextLayer from "../layers/text-layer";
import NoteLayer from "../layers/note-layer";
import PathLayer from "../layers/path-layer";
import { convertRgbToHex } from "../../../../../../lib/colors";

const LayerPreview = ({
  id,
  selectionColor,
  onLayerPointerDown,
}: {
  id: string;
  selectionColor?: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
}) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Ellipse:
      return (
        <EllipseLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <RectangleLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    case LayerType.Triangle:
      return (
        <TriangleLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <TextLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <NoteLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    case LayerType.Path:
      return (
        <PathLayer
          id={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          stroke={selectionColor}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? convertRgbToHex(layer.fill) : "#000"}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
};

export default React.memo(LayerPreview);
