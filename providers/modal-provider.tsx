"use client";

import { useEffect, useState } from "react";
import RenameModal from "../components/common/rename-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <RenameModal />
    </>
  );
};

export default ModalProvider;
