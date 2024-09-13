import { RegistrationCardDTO } from "~/domain/dtos/registration";

export const GET_REGISTRATION_CARD_KEY = "getRegistrationsData";

export async function getRegistrationCardsFn() {
  const data = await fetch(`${import.meta.env.VITE_API_URL}/registrations`);
  const response = (await data.json()) as RegistrationCardDTO[];
  return response;
}

export const POST_REGISTRATION_CARD_KEY = "postRegistrationCard";

export async function postRegistrationCardFn(data: RegistrationCardDTO) {
  await fetch(`${import.meta.env.VITE_API_URL}/registrations`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
