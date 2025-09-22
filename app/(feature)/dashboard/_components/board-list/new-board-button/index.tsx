"use client";

import { Plus } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import { useApiMutation } from "../../../../../../hooks/use-api-mutation";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const NewBoardButton = ({
  orgId,
  disabled,
}: {
  orgId: string;
  disabled?: boolean;
}) => {
  const { mutate, pending } = useApiMutation(api.mutations.board.create);
  const router = useRouter();
  const handleClick = async () => {
    if (disabled) return;
    try {
      const id = await mutate({ orgId, title: "New Board" });
      toast.success("Board created");
      router.push(`/board/${id}`);
    } catch {
      toast.error("Failed to create board");
    }
    //Todo redirect to the new board
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleClick}
      className={cn(
        `col-span-1 aspect-[100/127] bg-blue-600 rounded-lg
    hover:bg-blue-800 flex flex-col items-center justify-center py-6`,
        (pending || disabled) &&
          "opacity-50 cursor-not-allowed hover:bg-blue-600"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-xs mt-2 text-white font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
