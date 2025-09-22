"use client";

import { LucideIcon } from "lucide-react";
import Hint from "../../../../../../../components/common/hint";
import { Button } from "../../../../../../../components/ui/button";

interface ToolbarButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const ToolbarButton = ({
  label,
  icon: Icon,
  onClick,
  active,
  disabled,
}: ToolbarButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={disabled}
        onClick={onClick}
        size={"icon"}
        variant={active ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolbarButton;
