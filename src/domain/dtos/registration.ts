export type RegistrationDTO = {
  id: string;
  employeeName: string;
  email: string;
  status: "APPROVED" | "REVIEW" | "REPROVED";
  admissionDate: string;
  cpf: string;
};

export type GetRegistrationCardsFn = {
  queryKey: [string];
};
