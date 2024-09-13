import { useContext } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import Button from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import { GET_REGISTRATION_CARD_KEY } from "~/queries/registrationCard";
import { CPFContext } from "~/context/cpf";
import TextField from "~/components/TextField";
import routes from "~/router/routes";
import * as S from "./styles";
import { useQueryClient } from "@tanstack/react-query";
import { CPFValidator } from "~/helpers/validateCPF";
import { useMask } from "@react-input/mask";

export const SearchBar = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const cpfContext = useContext(CPFContext);
  const inputRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const onRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: [GET_REGISTRATION_CARD_KEY],
    });
  };

  return (
    <S.Container>
      <TextField
        ref={inputRef}
        placeholder="Digite um CPF válido"
        onChange={(event) => {
          const target = event.target as HTMLInputElement;
          const value = target.value.replace(/\D/g, "");
          if (CPFValidator.validate(value) || value == "") {
            cpfContext?.setCPF(value);
          }
        }}
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
