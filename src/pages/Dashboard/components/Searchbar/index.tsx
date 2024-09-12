import { useContext } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { CPFValidator } from "~/helpers/validateCPF";
import { REGISTRATION_CARD_KEY } from "~/queries/getRegistrationCards";
import { CPFContext } from "~/context/cpf";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useQueryClient } from "@tanstack/react-query";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { setCPF } = useContext(CPFContext);
  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [REGISTRATION_CARD_KEY],
    });
  };

  const onChangeCPFInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = event.target.value.replace(/\D/g, "");
    setCPF(event.target.value);
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        onChange={onChangeCPFInput}
      />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
