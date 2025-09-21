import { FormEvent, FormEventHandler, useEffect, useState } from "react";
import { useRenameModal } from "../../../store/use-rename-modal";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const useRenameModalHook = () => {
  const { isOpen, initialValues, onClose } = useRenameModal();
  const [title, setTitle] = useState(initialValues.title);
  const { mutate, pending } = useApiMutation(api.mutations.board.updateBoard);
  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await mutate({
        id: initialValues.id,
        title,
      });
      toast.success(`Board renamed to "${title}"`);
      onClose();
    } catch {
      toast.error("Failed to rename board");
    }
  };

  return {
    isOpen,
    title,
    setTitle,
    onClose,
    onSubmit,
    mutate,
    pending,
  };
};
export default useRenameModalHook;
