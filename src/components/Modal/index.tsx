import { useContext } from "react";
import { ModalContext } from "~/context/modal";
import { ModalBtnsDTO } from "~/domain/dtos/modal";
import Button from "../Buttons";
import * as S from "./styles";

export function ModalContainer() {
  const contextModal = useContext(ModalContext);
  return (
    contextModal?.isOpen && (
      <S.Background>
        <S.Container>
          <h1>{contextModal.title}</h1>
          <span>{contextModal.description}</span>
          <S.BtnsList>
            {(contextModal.btns || []).map((props: ModalBtnsDTO) => (
              <Button {...props} key={props.id}>
                {props.label}
              </Button>
            ))}
            <Button onClick={contextModal.close}>Fechar</Button>
          </S.BtnsList>
        </S.Container>
      </S.Background>
    )
  );
}
