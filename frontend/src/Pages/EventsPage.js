import { json, useLoaderData, defer, Await } from "react-router-dom";
// import { useEffect, useState } from "react";

import EventsList from "../components/EventsList";
import { Suspense } from "react";

function Events() {
  const { events } = useLoaderData();
  // if (data.error) {
  //   return <p>{data.errorMessage}</p>;
  // }
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={events}>
        {(loadEvents) => {
          return <EventsList events={loadEvents} />;
        }}
      </Await>
    </Suspense>
  );
}

export default Events;

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

export function loader() {
  return defer({ events: Eventloader() });
}
