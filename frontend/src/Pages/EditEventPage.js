import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

function EditEvent() {
  const data = useRouteLoaderData("event-details");
  return <EventForm event={data.event} method="PATCH" />;
}

export default EditEvent;
