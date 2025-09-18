"use client";

import React from "react";
import { Color, LayerType } from "../../../../../types/canvas";
import { useStorage } from "@liveblocks/react";
import RectangleLayer from "../layers/rectangle-layer";

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
    case LayerType.Rectangle:
      return (
        <RectangleLayer
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );

    default:
      console.warn("Unknown layer type");
      return null;
  }
};

export default React.memo(LayerPreview);
