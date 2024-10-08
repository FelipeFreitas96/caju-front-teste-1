import { ButtonSmall } from "~/components/Buttons";
import { RegistrationCardDTO } from "~/domain/dtos/registration";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteRegistrationCardFn,
  GET_REGISTRATION_CARD_KEY,
  putRegistrationCardFn,
} from "~/queries/registrationCard";
import { toast } from "react-toastify";
import { useCallback, useContext } from "react";
import { ModalContext } from "~/context/modal";
import { StatusModalTranslation } from "~/domain/translations/status";

type Props = {
  data: RegistrationCardDTO;
};

const RegistrationCard = ({ data }: Props) => {
  const isInReview = data.status === "REVIEW";
  const queryClient = useQueryClient();
  const modalContext = useContext(ModalContext);
  const updateMutate = useMutation({
    mutationFn: putRegistrationCardFn,
  });

  const deleteMutate = useMutation({
    mutationFn: deleteRegistrationCardFn,
  });

  const onDelete = useCallback(async () => {
    modalContext?.open({
      description: `Deseja realmente deletar o funcionário ${data.employeeName}?`,
      title: "Deletar Funcionário",
      btns: [
        {
          id: "confirm-button",
          label: "Confirmar",
          onClick: async () => {
            modalContext?.close();
            await deleteMutate.mutateAsync(data, {
              onSuccess: async () => {
                await queryClient.refetchQueries({
                  queryKey: [GET_REGISTRATION_CARD_KEY],
                });
                toast.success("Funcionário deletado com sucesso");
              },
              onError: () => {
                toast.error("Erro ao deletar funcionário, tente novamente.");
              },
            });
          },
        },
      ],
    });
  }, [data]);

  const onChangeStatus = useCallback(
    (status: RegistrationCardDTO["status"]) => async () => {
      if (data.status == status) return;
      const description = StatusModalTranslation[status].replace(
        "{employeeName}",
        data.employeeName
      );

      modalContext?.open({
        title: `Mudança de Status`,
        description,
        btns: [
          {
            id: "confirm-button",
            label: "Confirmar",
            onClick: async () => {
              modalContext?.close();
              await updateMutate.mutateAsync(
                {
                  ...data,
                  status,
                },
                {
                  onSuccess: () => {
                    if (status === "APPROVED") {
                      toast.success("Funcionário aprovado com sucesso");
                    } else if (status === "REPROVED") {
                      toast.success("Funcionário reprovado com sucesso");
                    } else if (status === "REVIEW") {
                      toast.success(
                        "Funcionário enviado para revisão com sucesso"
                      );
                    }

                    queryClient.refetchQueries({
                      queryKey: [GET_REGISTRATION_CARD_KEY],
                    });
                  },
                  onError: () => {
                    toast.error(
                      "Erro ao alterar status do funcionário, tente novamente."
                    );
                  },
                }
              );
            },
          },
        ],
      });
    },
    [data]
  );

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{data.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{data.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{data.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {isInReview && (
          <>
            <ButtonSmall
              bgcolor="rgb(255, 145, 154)"
              onClick={onChangeStatus("REPROVED")}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              onClick={onChangeStatus("APPROVED")}
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {!isInReview && (
          <ButtonSmall bgcolor="#ff8858" onClick={onChangeStatus("REVIEW")}>
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash onClick={onDelete} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
