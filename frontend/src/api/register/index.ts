import { client } from "../httpClient";

export const registerAcquiredItem = (data: any) => {
  client.post("http://localhost:3000/api/abab", data);
};

export const registerLostItem = (data: any) => {
  client.post("http://localhost:3000/api/abab", data);
};
