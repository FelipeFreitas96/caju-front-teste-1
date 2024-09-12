import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { REGISTRATION_CARD_KEY } from "~/queries/getRegistrationCards";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useQueryClient } from "@tanstack/react-query";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [REGISTRATION_CARD_KEY],
    });
  };

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={onRefresh}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};
