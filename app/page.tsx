import { getEvents } from "@/lib/events";

export default async function Home() {
  const data = await getEvents();

  // If there are no events, display a message
  if (!data?.events?.length) {
    return <div>No events</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      <ul className="flex flex-col p-4 gap-2">
        {data.events.map((event) => (
          <li key={event.id} className="border">
            <div>{event.name}</div>
            <div>{event.data?.location_name}</div>
            <div>{event.data?.location_address}</div>
            <div>{event.data?.scheduled_dates?.join(", ")}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
