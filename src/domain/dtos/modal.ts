export interface ModalBtnsDTO {
  id: string;
  label: string;
  onClick: () => void;
};

export interface ModalDTO {
  title: string;
  description: string;
  btns: ModalBtnsDTO[];
  isOpen: boolean;
}
