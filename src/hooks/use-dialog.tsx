import { useState } from "react";

export function useDialog(bool: boolean) {
  const [isOpen, setIsOpen] = useState<boolean>(bool);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, open, close, toggle };
}
