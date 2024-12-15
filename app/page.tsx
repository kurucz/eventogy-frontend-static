import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEvents } from "@/lib/events";
import Image from "next/image";

export default async function Home() {
  const data = await getEvents();

  // If there are no events, display a message
  if (!data?.events?.length) {
    return <div>No events</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <ul className="grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.events.map((event) => (
          <Card key={event.id} className="grid grid-rows-[auto_1fr_auto]">
            <CardHeader>
              <div className="relative -m-6 mb-0">
                <Image
                  alt={event.image.alt}
                  width={event.image.width}
                  height={event.image.height}
                  src={event.image.url}
                  className="w-full h-32 object-cover"
                />
              </div>
              <CardTitle>{event.name}</CardTitle>
              <CardDescription>{event.status}</CardDescription>
            </CardHeader>
            <CardContent>
              {event.readAbleDateRange ? (
                <p>{event.readAbleDateRange}</p>
              ) : null}
              <p>{event.data?.location_name}</p>
            </CardContent>
            <CardFooter>
              <button>View</button>
            </CardFooter>
          </Card>
        ))}
      </ul>
    </div>
  );
}
