import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { cn } from "@/lib/utils";
import { convertRgbToHex } from "@/lib/colors";
import {
  LayerType,
  TextLayer as ITextLayer,
} from "../../../../../../types/canvas";
import { useMutation } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";

const font = Kalam({ subsets: ["latin"], weight: "400" });

const calculateFontSize = (width: number, height: number, value: string) => {
  console.log("Calculating font size for width:", width, "height:", height);

  const maxFontSize = 92; // Maximum font size
  const scaleFactor = 0.6; // Adjust this factor to control scaling
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface TextProps {
  id: string;
  layer: ITextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const TextLayer = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
  const updateValue = useMutation(({ storage }, newText: string) => {
    const l = storage.get("layers").get(id) as LiveObject<ITextLayer>;
    l?.set("value", newText);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  const { x, y, fill, height, type, width, value } = layer;
  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
    >
      <ContentEditable
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          font.className
        )}
        html={value ? value : ""}
        style={{
          color: convertRgbToHex(fill) || "#000",
          fontSize: calculateFontSize(width, height, value ? value : ""),
          fontWeight: 100,
        }}
        onChange={handleContentChange}
      />
    </foreignObject>
  );
};

export default TextLayer;
