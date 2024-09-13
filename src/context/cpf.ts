import * as React from "react";

interface CPFContextInterface {
  cpf: string;
  setCPF: React.Dispatch<React.SetStateAction<string>>;
}

export const CPFContext = React.createContext<CPFContextInterface | undefined>(undefined);
