// header authorization에 토큰을 담을 경우 대비

import { LOCAL_STORAGE_TOKEN_KEY } from "@/config/constants";

export function getLocalStorageToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) ?? "";
  }
}

export function setLocalStorageToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
  }
}
