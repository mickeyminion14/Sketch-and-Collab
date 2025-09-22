import {
  useHistory,
  useSelf,
  useCanRedo,
  useCanUndo,
  useMutation,
  useStorage,
  useOthersMapped,
  useErrorListener,
} from "@liveblocks/react";
import { useCallback, useMemo, useState } from "react";
import {
  findIntersectingLayersWithSelectionNet,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "../../../../../lib/utils";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  Layers,
  LayerType,
  Point,
  Side,
  XYWH,
} from "../../../../../types/canvas";

import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { generateRandomColor } from "../../../../../lib/colors";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MAX_LAYERS = 1000;

export const useCanvas = () => {
  const router = useRouter();

  useErrorListener((err) => {
    toast.error("Board not found. Redirecting to home.");
    router.push("/dashboard");
  });

  const layerIds = useStorage((root) => root.layerIds) || [];

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  const history = useHistory();
  const info = useSelf((me) => me.info);
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const selections = useOthersMapped((other) => other.presence.selection);

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = generateRandomColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const insertLayer = useMutation(
    (
      { setMyPresence, storage },
      layerType: Exclude<LayerType, LayerType.Text>,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const newLayer = new LiveObject<any>({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      liveLayers.set(layerId, newLayer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

  const resizeLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return;
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) {
        layer.update(bounds);
      }
    },
    [canvasState]
  );

  const translateLayers = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [canvasState]
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length) {
      setMyPresence({ selection: [] }, { addToHistory: true });
    }
  }, []);

  const startMultiSelection = useCallback((current: Point, origin: Point) => {
    if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > 5) {
      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });
    }
  }, []);

  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({ mode: CanvasMode.SelectionNet, origin, current });

      const selectedLayerIds = findIntersectingLayersWithSelectionNet(
        layerIds,
        layers,
        origin,
        current
      );
      console.log(selectedLayerIds);

      setMyPresence({ selection: selectedLayerIds });
    },
    [layerIds]
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({ x: camera.x - e.deltaX, y: camera.y - e.deltaY }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateLayers(current);
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [camera, canvasState, resizeLayer, translateLayers]
  );

  const onPointerLeave = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      setMyPresence({ cursor: null });
    },
    []
  );

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);

      if ([CanvasMode.None, CanvasMode.Pressing].includes(canvasState.mode)) {
        unselectLayers();
        setCanvasState({ mode: CanvasMode.None });
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(
          canvasState.layerType as Exclude<LayerType, LayerType.Text>,
          point
        );
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }
      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        return;
      }

      //Todo: Add case for drawing

      setCanvasState({ origin: point, mode: CanvasMode.Pressing });
    },
    [camera, canvasState.mode, setCanvasState]
  );

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        [CanvasMode.Inserting, CanvasMode.Pencil].includes(canvasState.mode)
      ) {
        return;
      }
      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode]
  );

  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause();
      setCanvasState({ mode: CanvasMode.Resizing, initialBounds, corner });
    },
    [history]
  );

  return {
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
    translateLayers,
    onPointerDown,
    setLastUsedColor,
  };
};
