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

export const PUT_REGISTRATION_CARD_KEY = "putRegistrationCard";
export async function putRegistrationCardFn(data: RegistrationCardDTO) {
  await fetch(`${import.meta.env.VITE_API_URL}/registrations/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const DELETE_REGISTRATION_CARD_KEY = "deleteRegistrationCard";
export async function deleteRegistrationCardFn(data: RegistrationCardDTO) {
  await fetch(`${import.meta.env.VITE_API_URL}/registrations/${data.id}`, {
    method: "DELETE",
  });
}
