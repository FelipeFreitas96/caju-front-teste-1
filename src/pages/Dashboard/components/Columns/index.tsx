import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationCardDTO } from "~/domain/dtos/registration";
import { Loading } from "~/components/Loading";
import { useContext } from "react";
import { CPFContext } from "~/context/cpf";

const allColumns = [
  { status: "REVIEW", title: "Pronto para revisar" },
  { status: "APPROVED", title: "Aprovado" },
  { status: "REPROVED", title: "Reprovado" },
];

type Props = {
  registrations?: RegistrationCardDTO[];
  isLoading: boolean;
};

const Collumns = ({ isLoading, registrations }: Props) => {
  const cpfContext = useContext(CPFContext);
  console.log(registrations);
  
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
                        item.status === collum.status &&
                        item.cpf.includes(cpfContext?.cpf || "")
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
