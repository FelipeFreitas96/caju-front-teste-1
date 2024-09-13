import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "~/components/TextField";
import * as S from "./styles";
import Button from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { useMutation } from "@tanstack/react-query";
import { postRegistrationCardFn } from "~/queries/getRegistrationCards";
import { FormRegistrationCardDTO } from "~/domain/dtos/registration";
import { CPFValidator } from "~/helpers/validateCPF";
import { toast } from "react-toastify";
import { useMask } from "@react-input/mask";

const RegistrationCardSchema = Yup.object().shape({
  cpf: Yup.string()
    .required("Campo obrigatório")
    .test("is-cpf", "CPF inválido", CPFValidator.validate),
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  admissionDate: Yup.string()
    .required("Data de admissão é obrigatória")
    .test("is-date", "Data inválida", (value) => {
      return new Date(value).getTime() < new Date().getTime();
    }),
  employeeName: Yup.string().required("Nome do funcionário é obrigatório"),
});

const NewUserPage = () => {
  const history = useHistory();
  const inputRef = useMask({
    mask: "___.___.___-__",
    replacement: { _: /\d/ },
  });

  const mutate = useMutation({
    mutationFn: postRegistrationCardFn,
  });

  const formik = useFormik<FormRegistrationCardDTO>({
    initialValues: {
      admissionDate: "",
      cpf: "",
      email: "",
      employeeName: "",
    },
    onSubmit: async (values: FormRegistrationCardDTO) => {
      try {
        await RegistrationCardSchema.validate(values);
        await mutate.mutateAsync({
          ...values,
          cpf: values.cpf.replace(/\D/g, ""),
          id: Math.random().toString(36).substring(7),
          status: "REVIEW",
        });
        history.push(routes.dashboard);
      } catch (err) {
        const error = err as Yup.ValidationError;
        toast.error(error.message);
      }
    },
  });

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  return (
    <S.Content onSubmit={formik.handleSubmit}>
      <S.Card>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          onChange={formik.handleChange("employeeName")}
          onBlur={formik.handleBlur("employeeName")}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          onChange={formik.handleChange("email")}
          onBlur={formik.handleBlur("email")}
        />
        <TextField
          placeholder="CPF"
          name="cpf"
          onChange={formik.handleChange("cpf")}
          onBlur={formik.handleBlur("cpf")}
          ref={inputRef}
        />
        <TextField
          label="Data de admissão"
          type="date"
          onChange={formik.handleChange("admissionDate")}
          onBlur={formik.handleBlur("admissionDate")}
        />
        <Button type="submit">Cadastrar</Button>
      </S.Card>
    </S.Content>
  );
};

export default NewUserPage;
