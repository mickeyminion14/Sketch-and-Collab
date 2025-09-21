"use client";

import { memo } from "react";
import { Camera, Color } from "../../../../../types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { useSelectionBounds } from "../../../../../hooks/use-selection-bounds";
import { ColorPicker } from "./color-picker";
import { useDeleteLayers } from "../../../../../hooks/use-delete-layers";
import { Button } from "../../../../../components/ui/button";
import Hint from "../../../../../components/common/hint";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

const SelectionTools = ({
  camera,
  setLastUsedColor,
}: {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}) => {
  const selection = useSelf((me) => me.presence.selection);

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection?.forEach((layerId) => {
        const layer = liveLayers.get(layerId);
        if (layer) {
          layer.set("fill", fill);
        }
      });
    },
    [selection]
  );

  const deleteLayers = useDeleteLayers();

  const selectionBounds = useSelectionBounds();

  const moveToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indicesToMove: number[] = [];
      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indicesToMove.push(i);
        }
      }

      for (let i = 0; i < indicesToMove.length; i++) {
        liveLayerIds.move(indicesToMove[i], i);
      }
    },
    [selection]
  );

  const moveToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indicesToMove: number[] = [];
      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indicesToMove.push(i);
        }
      }

      for (let i = indicesToMove.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indicesToMove[i],
          arr.length - 1 - (indicesToMove.length - 1 - i)
        );
      }
    },
    [selection]
  );

  if (!selectionBounds) {
    return null;
  }

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(calc(${x}px - 50%),calc(${y - 16}px - 100%))`,
      }}
    >
      <ColorPicker
        moreThanOneLayerSelected={selection ? selection.length > 1 : false}
        onChange={setFill}
      />
      <div className="flex flex-col gap-y-0.5">
        <Hint label="Bring To Front">
          <Button variant={"board"} size={"icon"} onClick={moveToFront}>
            <BringToFront />
          </Button>
        </Hint>
        <Hint label="Send To Back">
          <Button variant={"board"} size={"icon"} onClick={moveToBack}>
            <SendToBack />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center pl-2 ml-2 border-l border-neutral-200">
        <Hint label="Delete">
          <Button variant={"board"} size={"icon"} onClick={deleteLayers}>
            <Trash2 />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default memo(SelectionTools);
