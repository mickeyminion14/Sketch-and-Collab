import { toast } from "sonner";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import { useRenameModal } from "../../../store/use-rename-modal";

const useBoardActions = ({ id }: { id: string }) => {
  const { mutate, pending } = useApiMutation(api.mutations.board.deleteBoard);
  const { onOpen: onOpenRenameModal } = useRenameModal();

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/board/${id}`;
    try {
      navigator.clipboard.writeText(url);
      toast.success("Board link copied to clipboard");
    } catch {
      toast.error("Failed to copy board link");
    }
  };

  const handleDeleteBoard = async () => {
    try {
      await mutate({ id });
      toast.success("Board deleted successfully");
    } catch {
      toast.error("Failed to delete board");
    }
  };

  return { handleCopyLink, handleDeleteBoard, pending, onOpenRenameModal };
};

export default useBoardActions;
