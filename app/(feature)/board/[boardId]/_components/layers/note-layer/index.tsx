import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn } from "@/lib/utils";
import { convertRgbToHex, getContrastColor } from "@/lib/colors";
import { NoteLayer as INoteLayer } from "../../../../../../../types/canvas";
import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";

// Font
const font = Kalam({ subsets: ["latin"], weight: "400" });

// Font size calculation
const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 92;
  const scaleFactor = 0.15;
  return Math.min(height * scaleFactor, width * scaleFactor, maxFontSize);
};

interface NoteProps {
  id: string;
  layer: INoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const NoteLayer = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
  const updateValue = useMutation(({ storage }, newText: string) => {
    const l = storage.get("layers").get(id) as LiveObject<INoteLayer>;
    l?.set("value", newText);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const { x, y, fill, height, width, value } = layer;

  const baseColor = convertRgbToHex(fill) || "#fff799";

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `2px solid ${selectionColor}` : "none",
        background: baseColor,
        color: getContrastColor(fill) || "#000",
      }}
      className={cn(
        "shadow-xl drop-shadow-xl rounded-md",
        "shadow-[0_8px_20px_rgba(0,0,0,0.6)]",
        font.className
      )}
    >
      <ContentEditable
        className="h-full w-full flex items-center justify-center text-center outline-none"
        html={value ? value : ""}
        style={{
          fontSize: calculateFontSize(width, height),
          fontWeight: 400,
        }}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};

export default NoteLayer;
