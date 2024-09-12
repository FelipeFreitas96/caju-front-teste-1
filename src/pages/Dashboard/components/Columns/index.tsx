import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { RegistrationDTO } from "../../interfaces";
import { Loading } from "~/components/Loading";

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
                  {registrations?.map((registration) => {
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
