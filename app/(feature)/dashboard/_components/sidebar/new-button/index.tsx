"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../../components/ui/dialog";

import React from "react";
import Hint from "../../../../../../components/common/hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="Create Organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <button
              className="bg-white/25 w-full h-full rounded-md 
            flex items-center justify-center opacity-60 hover:opacity-100 transition"
            >
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 border-none max-w-fit">
        <CreateOrganization routing="hash" />
      </DialogContent>
    </Dialog>
  );
};
