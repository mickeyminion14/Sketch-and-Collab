import { create } from "zustand";

const defaultState = {
  id: "",
  title: "",
};

interface RenameModal {
  isOpen: boolean;
  initialValues: typeof defaultState;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<RenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultState,
  onOpen: (id, title) => {
    set({
      isOpen: true,
      initialValues: { id, title },
    });
  },
  onClose: () => {
    set({
      isOpen: false,
      initialValues: defaultState,
    });
    setTimeout(() => {
      document.body.style.pointerEvents = "auto";
    }, 300);
  },
}));
