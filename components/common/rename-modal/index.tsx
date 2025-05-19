"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "../../../store/use-rename-modal";
import { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import useRenameModalHook from "./index.hook";

const RenameModal = () => {
  const { isOpen, onClose, onSubmit, setTitle, title, pending } =
    useRenameModalHook();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Board</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new title for this board.</DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            type="text"
            defaultValue={title}
            className="focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-transparent"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new board title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
