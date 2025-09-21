"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import useBoardActions from "./index.hook";
import ConfirmationDialog from "../../common/confirm-dialog";
import { Button } from "../../ui/button";

interface BoardActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}
const BoardActions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: BoardActionsProps) => {
  const { handleCopyLink, handleDeleteBoard, pending, onOpenRenameModal } =
    useBoardActions({
      id,
    });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        side={side}
        sideOffset={sideOffset}
        className="w-60"
        onClick={(e) => e.stopPropagation()}
      >
        <DropdownMenuItem
          className="cursor-pointer p-3"
          onClick={handleCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy Board Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpenRenameModal(id, title)}>
          <Pencil className="h-4 w-4 mr-2" />
          Rename Board
        </DropdownMenuItem>
        <ConfirmationDialog
          header="Delete Board ?"
          onConfirm={handleDeleteBoard}
          description={`Are you sure you want to delete the board "${title}"? This action cannot be undone.`}
          disabled={pending}
        >
          <Button
            variant={"ghost"}
            className="cursor-pointer p-3 text-sm w-full font-normal justify-start"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Board
          </Button>
        </ConfirmationDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BoardActions;
