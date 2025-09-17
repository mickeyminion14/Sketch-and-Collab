import React from "react";
import ToolbarButton from "./toolbar-button";
import {
  Circle,
  MousePointer2,
  Pencil,
  Redo2,
  Square,
  StickyNote,
  Type,
  Undo2,
} from "lucide-react";
import {
  CanvasAction,
  CanvasMode,
  CanvasState,
  LayerType,
} from "../../../../../types/canvas";

interface ToolbarProps {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  canRedo,
  canUndo,
  canvasState,
  redo,
  setCanvasState,
  undo,
}: ToolbarProps) => {
  const isToolbarButtonActive = (canvasActionType: CanvasAction): boolean => {
    switch (canvasActionType) {
      case CanvasAction.Select:
        return [
          CanvasMode.None,
          CanvasMode.Translating,
          CanvasMode.SelectionNet,
          CanvasMode.Pressing,
          CanvasMode.Resizing,
        ].includes(canvasState.mode);

      case CanvasAction.Text:
        return (
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Text
        );

      case CanvasAction.Note:
        return (
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Note
        );

      case CanvasAction.Rectangle:
        return (
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Rectangle
        );
      case CanvasAction.Ellipse:
        return (
          canvasState.mode === CanvasMode.Inserting &&
          canvasState.layerType === LayerType.Ellipse
        );

      case CanvasAction.Pen:
        return canvasState.mode === CanvasMode.Pencil;

      default:
        return false;
    }
  };

  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
        <ToolbarButton
          label={CanvasAction.Select}
          icon={MousePointer2}
          onClick={() => setCanvasState({ mode: CanvasMode.None })}
          active={isToolbarButtonActive(CanvasAction.Select)}
        />
        <ToolbarButton
          label={CanvasAction.Text}
          icon={Type}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Text,
            })
          }
          active={isToolbarButtonActive(CanvasAction.Text)}
        />
        <ToolbarButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Note,
            })
          }
          active={isToolbarButtonActive(CanvasAction.Note)}
        />
        <ToolbarButton
          label={CanvasAction.Rectangle}
          icon={Square}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Rectangle,
            })
          }
          active={isToolbarButtonActive(CanvasAction.Rectangle)}
        />
        <ToolbarButton
          label={CanvasAction.Ellipse}
          icon={Circle}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Inserting,
              layerType: LayerType.Ellipse,
            })
          }
          active={isToolbarButtonActive(CanvasAction.Ellipse)}
        />
        <ToolbarButton
          label={CanvasAction.Pen}
          icon={Pencil}
          onClick={() =>
            setCanvasState({
              mode: CanvasMode.Pencil,
            })
          }
          active={isToolbarButtonActive(CanvasAction.Pen)}
        />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <ToolbarButton
          label={CanvasAction.Undo}
          icon={Undo2}
          onClick={undo}
          disabled={!canUndo}
        />
        <ToolbarButton
          label={CanvasAction.Redo}
          icon={Redo2}
          onClick={redo}
          disabled={!canRedo}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md w-[50px]">
        <div className="h-6 w-16 bg-muted-400" />
        <div className="h-6 w-16 bg-muted-400" />
        <div className="h-6 w-16 bg-muted-400" />
        <div className="h-6 w-16 bg-muted-400" />
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md w-[50px]">
        <div className="h-6 w-16 bg-muted-400" />
        <div className="h-6 w-16 bg-muted-400" />
      </div>
    </div>
  );
};
