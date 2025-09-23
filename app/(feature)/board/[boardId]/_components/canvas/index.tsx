"use client";

import { Info } from "../info";
import { Participants } from "../participants";
import { Toolbar } from "../toolbar";
import CanvasLoader from "./loader";

import { CanvasMode } from "../../../../../../types/canvas";
import CursorsPresence from "../cursors-presence";

import LayerPreview from "../layer-preview";
import SelectionBox from "../selection-box";
import { useCanvas } from "./index.hook";
import SelectionTools from "../selection-tools";
import PathLayer from "../layers/path-layer";
import { convertRgbToHex } from "../../../../../../lib/colors";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const {
    info,
    canvasState,
    setCanvasState,
    canRedo,
    canUndo,
    onWheel,
    onPointerMove,
    history,
    onPointerLeave,
    onPointerUp,
    camera,
    layerIds,
    onLayerPointerDown,
    layerIdsToColorSelection,
    onResizeHandlePointerDown,
    onPointerDown,
    setLastUsedColor,
    pencilDraft,
    lastUsedColor,
  } = useCanvas();

  if (!info) {
    return <CanvasLoader />;
  }

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        className="h-[100vh] w-[100vw]"
      >
        <g
          style={{
            transform: `translateX(${camera.x}px) translateY(${camera.y}px)`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <PathLayer
              points={pencilDraft}
              fill={convertRgbToHex(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
