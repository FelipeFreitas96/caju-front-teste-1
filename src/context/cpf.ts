import * as React from "react";

export const CPFContext = React.createContext({
    cpf: "",
    setCPF: (_: string) => {},
});
