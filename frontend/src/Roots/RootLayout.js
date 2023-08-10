import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/Autheticate";

function RootLayout() {
  const token = useLoaderData();
  const sumbit = useSubmit();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      sumbit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log("token expires in: " + tokenDuration);
    setTimeout(() => {
      sumbit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, sumbit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
