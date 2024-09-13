import { createContext } from "react";
import { ModalDTO } from "~/domain/dtos/modal";

export type ModalContextInterface = ModalDTO & {
  open: (settings: Omit<ModalDTO, "isOpen">) => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextInterface | undefined>(
  undefined
);
