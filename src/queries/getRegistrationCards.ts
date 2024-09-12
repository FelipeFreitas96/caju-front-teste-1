import { RegistrationDTO } from "~/pages/Dashboard/interfaces";

export async function getRegistrationCardsFn() {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/registrations`);
  const response = await data.json();
  return response as RegistrationDTO[];
}
