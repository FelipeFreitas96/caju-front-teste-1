export type RegistrationCardDTO = {
  id: string;
  employeeName: string;
  email: string;
  status: "APPROVED" | "REVIEW" | "REPROVED";
  admissionDate: string;
  cpf: string;
};

export type FormRegistrationCardDTO = Omit<RegistrationCardDTO, "id" | "status">;
export type GetRegistrationCardsFn = {
  queryKey: [string];
};
