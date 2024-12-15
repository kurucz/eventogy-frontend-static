import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/events";

export default async function Home() {
  const data = await getEvents();

  // If there are no events, display a message
  if (!data?.events?.length) {
    return <div>No events</div>;
  }

  return (
    <div className="container mx-auto p-4 ">
      <ul className="grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            slug={event.slug}
            image={event.image}
            name={event.name}
            date={event.readAbleDateRange ?? ""}
            location={event.data?.location_name ?? ""}
            status={event.status}
          />
        ))}
      </ul>
    </div>
  );
}
