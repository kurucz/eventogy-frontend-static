import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import StatusBadge from "./StatusBadge";
import Menu from "./Menu";

export default function EventCard({
  id,
  name,
  slug,
  image,
  date,
  location,
  status,
}: {
  id: string;
  name: string;
  slug: string;
  image: { url: string; alt: string; width: number; height: number };
  date?: string;
  location?: string;
  status: string;
}) {
  return (
    <Card key={id} className="overflow-hidden grid grid-rows-[auto_1fr_auto]">
      <CardHeader className="gap-2">
        <div className="relative -m-6 mb-0">
          <Image
            alt={image.alt}
            width={image.width}
            height={image.height}
            src={image.url}
            className="w-full h-32 object-cover"
          />
        </div>
        <div>
          <StatusBadge status={status} />
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      {date || location ? (
        <CardContent className="text-slate-500">
          {date ? <p>{date}</p> : null}
          {location ? <p>{location}</p> : null}
        </CardContent>
      ) : null}
      <CardFooter className="justify-end self-end">
        <Menu id={id} slug={slug} />
      </CardFooter>
    </Card>
  );
}
