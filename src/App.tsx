import Router from "~/router";
import { Header } from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { CPFContext } from "./context/cpf";
import { ModalContainer } from "./components/Modal";
import { ToastContainer } from "react-toastify";
import { ModalContext } from "./context/modal";
import { ModalDTO } from "./domain/dtos/modal";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

function App() {
  const [cpf, setCPF] = React.useState("");
  const [modal, setModal] = React.useState<ModalDTO>({
    isOpen: false,
    title: "",
    description: "",
    btns: [],
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CPFContext.Provider value={{ cpf, setCPF }}>
        <ModalContext.Provider
          value={{
            btns: modal.btns,
            description: modal.description,
            isOpen: modal.isOpen,
            open: (settings) => {
              setModal((prev) => ({
                ...prev,
                isOpen: true,
                btns: settings.btns,
                description: settings.description,
                title: settings.title,
              }));
            },
            close: () => {
              setModal((prev) => ({ ...prev, isOpen: false }));
            },
            title: modal.title,
          }}
        >
          <Header>
            <h1>Caju Front Teste</h1>
          </Header>
          <Router />
          <ToastContainer />
          <ModalContainer />
        </ModalContext.Provider>
      </CPFContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
