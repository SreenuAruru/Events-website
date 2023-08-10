import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";
// import MainNavigation from "../components/MainNavigation";

function ErrorPage() {
  const error = useRouteError();
  let title = "An Error Occured!";
  let messages = "Something went wrong!";

  if (error.status === 500) {
    messages = error.data.message;
  }
  if (error.status === 404) {
    title = "Not Found!";
    messages = "Cloud not find resource or page.";
  }

  return (
    <>
      {/* <MainNavigation /> */}
      <PageContent title={title}>
        <p>{messages}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
