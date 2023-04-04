const IS_LOGGED_IN_KEY = "is_logged_in";
const IS_LOGGED_IN_VAL = "OK";

export function isLoggedIn() {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem(IS_LOGGED_IN_KEY) === IS_LOGGED_IN_VAL) {
      return true;
    }
  }
  return false;
}

export function setIsLoggedIn() {
  sessionStorage.setItem(IS_LOGGED_IN_KEY, IS_LOGGED_IN_VAL);
}

export function removeIsLoggedIn() {
  sessionStorage.removeItem(IS_LOGGED_IN_KEY);
}
