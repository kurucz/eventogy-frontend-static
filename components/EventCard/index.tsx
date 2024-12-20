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
import { Skeleton } from "../ui/skeleton";

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
    <Card
      key={id}
      className="relative overflow-hidden grid grid-rows-[auto_1fr_auto] after:block after:h-2 after:w-full after:left-0 after:absolute after:bg-gray-100 after:bottom-0"
    >
      <CardHeader className="gap-2">
        <div className="relative -m-4 mb-0">
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
        <CardContent className="text-slate-500 text-sm">
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

export function EventCardSkeleton() {
  return (
    <Card className="grid grid-rows-[auto_1fr_auto] ">
      <CardHeader className="gap-2">
        <div className="w-full">
          <Skeleton className="h-32 -m-4 mb-0" />
        </div>
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-[250px]" />
      </CardContent>
      <CardFooter className="justify-end self-end">
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}
