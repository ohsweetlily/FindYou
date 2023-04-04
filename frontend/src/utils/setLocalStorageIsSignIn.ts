import {
  LOCAL_STORAGE_IS_SIGNIN_KEY,
  LOCAL_STORAGE_IS_SIGNIN_VALUE,
} from "@/config/constants";

// 로그인 여부를 알려주는 플래그
export function setLocalStorageIsSignIn() {
  localStorage.setItem(
    LOCAL_STORAGE_IS_SIGNIN_KEY,
    LOCAL_STORAGE_IS_SIGNIN_VALUE
  );
}

export function getLocalStorageIsSignIn() {
  return localStorage.getItem(LOCAL_STORAGE_IS_SIGNIN_KEY);
}

export function removeLocalStorageIsSignIn() {
  localStorage.removeItem(LOCAL_STORAGE_IS_SIGNIN_KEY);
}

// 로그인이 됐을 경우 true
export function isSignIn() {
  return getLocalStorageIsSignIn() === LOCAL_STORAGE_IS_SIGNIN_VALUE;
}
