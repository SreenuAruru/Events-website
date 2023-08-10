import { createBrowserRouter, RouterProvider } from "react-router-dom";

import React from "react";

import RootLayout from "./Roots/RootLayout";
import EventRootLayout from "./Roots/EventRootLayout";

import Home from "./Pages/HomePage";
import Events, { loader as eventsLoader } from "./Pages/EventsPage";
import EventsDetail, {
  loader as eventDetailLoader,
  action as eventDetaildAction,
} from "./Pages/EventDetailPage";
import NewEvent from "./Pages/NewEventPage";
import EditEvent from "./Pages/EditEventPage";
import ErrorPage from "./Pages/ErrorPage";
import { action as manuPlateEventAction } from "./components/EventForm";
import NewsletterPage, {
  action as newsletterAction,
} from "./Pages/NewsletterPage";
import AuthenticationPage, {
  action as authAction,
} from "./Pages/Authentication";
import { action as logoutAction } from "./Pages/Logout";
import { authLoader, checkAuthenticateLoader } from "./util/Autheticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "homeRoot",
    loader: authLoader,
    children: [
      { index: true, element: <Home /> },
      {
        path: "events",
        element: <EventRootLayout />,
        children: [
          {
            index: true,
            element: <Events />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-details",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventsDetail />,
                action: eventDetaildAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: manuPlateEventAction,
                loader: checkAuthenticateLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEvent />,
            action: manuPlateEventAction,
            loader: checkAuthenticateLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "authentication",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
