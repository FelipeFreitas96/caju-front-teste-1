import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationDTO } from "~/domain/dtos/registration";
import { Loading } from "~/components/Loading";
import { useContext } from "react";
import { CPFContext } from "~/context/cpf";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: RegistrationDTO[];
  isLoading: boolean;
};

const Collumns = ({ isLoading, registrations }: Props) => {
  const { cpf } = useContext(CPFContext);
  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                <Loading isLoading={isLoading}>
                  {(registrations || [])
                    .filter(
                      (item) =>
                        item.status === collum.status && item.cpf.includes(cpf)
                    )
                    .map((registration) => {
                      return (
                        <RegistrationCard
                          data={registration}
                          key={registration.id}
                        />
                      );
                    })}
                </Loading>
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
