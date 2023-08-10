import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const nowDate = new Date();
  const duration = expirationDate.getTime() - nowDate.getTime();
  return duration;
}

export function authenticateToken() {
  const token = localStorage.getItem("authenticate-token");
  const tokenDuration = getTokenDuration();

  if (!token) {
    return null;
  }

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}

export function authLoader() {
  return authenticateToken();
}

//routes protection
export function checkAuthenticateLoader() {
  const token = authenticateToken();
  if (!token) {
    return redirect("/authentication");
  }
  return null;
}
