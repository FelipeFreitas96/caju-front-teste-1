import { RegistrationDTO } from "~/pages/Dashboard/interfaces";

export async function getRegistrationCardsFn() {
  const data = await fetch("http://localhost:3000/registrations");
  const response = await data.json();
  return response as RegistrationDTO[];
}
