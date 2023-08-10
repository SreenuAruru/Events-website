import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

import { authenticateToken } from "../util/Autheticate";

function EventsDetail() {
  const { event, events } = useRouteLoaderData("event-details");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventsDetail;

async function LoadEvent(id) {
  // const id = params.eventId;

  const response = await fetch(`http://localhost:8081/events/${id}`);
  if (!response.ok) {
    throw json({ message: "Cloud not fetch detailed data" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function Eventloader() {
  const response = await fetch("http://localhost:8081/events");
  if (!response.ok) {
    // return { error: true, errorMessage: "path is in Correct" };
    // throw new Response(JSON.stringify({ message: "could not found events." }), {
    //   status: 500,
    // });
    const errorData = await response.json();
    console.error("API Error:", errorData);
    throw json({ message: "could not found events." }, { status: 500 });
  } else {
    // const ResponseData = await response.json();
    // const { events } = ResponseData;
    // return events;
    const resData = await response.json();

    return resData.events;
  }
}

//this loader function run in browser so you can call also 1.localStorage,2.cookies and don't take react-router-dom's
export async function loader({ request, params }) {
  const id = params.eventId;

  // const response = await fetch(`http://localhost:8081/events/${id}`);
  // if (!response.ok) {
  //   throw json({ message: "Cloud not fetch detailed data" }, { status: 500 });
  // } else {
  //   return response;
  // }
  return defer({ event: await LoadEvent(id), events: Eventloader() });
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const token = authenticateToken();
  const response = await fetch("http://localhost:8081/events/" + eventId, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "Cloud not delete" }, { status: 500 });
  }
  return redirect("/events");
}
