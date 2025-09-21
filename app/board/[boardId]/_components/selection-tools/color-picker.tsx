import { Color } from "@/types/canvas";
import { convertRgbToHex } from "../../../../../lib/colors";
import { RGB_COLORS } from "../../../../../constants/colors";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../../../../components/ui/select";
import { useState } from "react";

export const ColorButton = ({ color }: { color: Color }) => {
  return (
    <button className="w-8 h-8 items-center flex justify-center">
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{ background: convertRgbToHex(color) }}
      />
    </button>
  );
};

export const ColorPicker = ({
  onChange,
  moreThanOneLayerSelected = false,
}: {
  onChange: (color: Color) => void;
  moreThanOneLayerSelected?: boolean;
}) => {
  const [selectOpen, setSelectOpen] = useState(false);
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-200">
      <Select
        disabled={moreThanOneLayerSelected}
        onValueChange={(selectedIdx) => {
          onChange(RGB_COLORS[+selectedIdx]);
        }}
      >
        <SelectTrigger
          onClick={() => {
            setSelectOpen(!selectOpen);
          }}
          className="outline-none ring-offset-0 ring-transparent focus-visible:ring-0  focus-visible:ring-offset-0 focus-visible:ring-transparent focus:ring-offset-0 focus:ring-transparent"
        >
          <div className="w-8 h-8 items-center flex justify-center hover:opacity-75 transition mr-1">
            <div
              className="h-8 w-8 rounded-md border border-neutral-300"
              style={{
                background:
                  "linear-gradient(135deg, #000000 0%, #ff3b30 25%, #ffcc00 50%, #34c759 75%, #0a84ff 100%)",
              }}
            ></div>
          </div>
        </SelectTrigger>
        <SelectContent className="w-8 h-[300px] min-w-11 flex justify-center">
          {[...RGB_COLORS].map((c, idx) => (
            <SelectItem
              value={idx + ""}
              className="w-8 h-8 p-0 m-0 mt-2 flex items-center justify-center hover:opacity-75 transition cursor-pointer"
              key={idx}
            >
              <ColorButton color={c} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
