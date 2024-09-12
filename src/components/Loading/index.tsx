import * as React from "react";
import { Circles } from "react-loading-icons";
import * as S from "./styles";

type IProps = {
  isLoading: boolean;
  children: React.ReactNode;
};

export function Loading({ isLoading, children }: IProps) {
  return isLoading ? (
    <S.Container>
      <Circles />
    </S.Container>
  ) : (
    <>{children}</>
  );
}
