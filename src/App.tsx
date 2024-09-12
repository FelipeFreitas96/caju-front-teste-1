import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { CPFContext } from "./context/cpf";

const queryClient = new QueryClient();

function App() {
  const [cpf, setCPF] = React.useState("");
  return (
    <QueryClientProvider client={queryClient}>
      <CPFContext.Provider value={{ cpf, setCPF }}>
        <Header>
          <h1>Caju Front Teste</h1>
        </Header>
        <Router />
      </CPFContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
