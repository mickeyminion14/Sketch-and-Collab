export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
}

export interface Layer<T extends LayerType> {
  type: T;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
}

export type RectangleLayer = Layer<LayerType.Rectangle>;

export type EllipseLayer = Layer<LayerType.Ellipse>;

export type PathLayer = Layer<LayerType.Path> & {
  points: number[][];
};
export type TextLayer = Layer<LayerType.Text>;

export type NoteLayer = Layer<LayerType.Text> & {
  value: string;
};

export type Point = {
  x: number;
  y: number;
};

export type XYWH = Point & {
  width: number;
  height: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 6,
}

export type CanvasState =
  | { mode: CanvasMode.None }
  | { mode: CanvasMode.SelectionNet; origin: Point; current?: Point }
  | { mode: CanvasMode.Translating; current: Point }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note;
    }
  | { mode: CanvasMode.Resizing; initialBounds: XYWH; corner: Side }
  | { mode: CanvasMode.Pencil }
  | { mode: CanvasMode.Pressing; origin: Point };

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
}

export enum CanvasAction {
  Select = "Select",
  Text = "Text",
  Note = "Sticky Note",
  Rectangle = "Rectangle",
  Ellipse = "Ellipse",
  Pen = "Pen",
  Undo = "Undo",
  Redo = "Redo",
}
