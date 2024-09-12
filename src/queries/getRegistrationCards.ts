import { RegistrationDTO } from "~/pages/Dashboard/interfaces";

export const REGISTRATION_CARD_KEY = "registrationsData";

export async function getRegistrationCardsFn() {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/registrations`);
  const response = await data.json();
  return response as RegistrationDTO[];
}
