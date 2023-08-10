import { redirect } from "react-router-dom";

export function action() {
  localStorage.removeItem("authenticate-token");
  return redirect("/");
}
