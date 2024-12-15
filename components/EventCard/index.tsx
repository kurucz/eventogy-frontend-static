import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

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
    <Card key={id} className="grid grid-rows-[auto_1fr_auto] overflow-hidden">
      <CardHeader>
        <div className="relative -m-6 mb-0">
          <Image
            alt={image.alt}
            width={image.width}
            height={image.height}
            src={image.url}
            className="w-full h-32 object-cover"
          />
        </div>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{status}</CardDescription>
      </CardHeader>
      {location || date ? (
        <CardContent>
          {date ? <p>{date}</p> : null}
          {location ? <p>{location}</p> : null}
        </CardContent>
      ) : null}
      <CardFooter>
        <Popover>
          <PopoverTrigger>Open</PopoverTrigger>
          <PopoverContent className="flex flex-col gap-2">
            <SettingsButton slug={slug} />
            <DuplicateButton id={id} />
            <ArchiveButton id={id} />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

const SettingsButton = ({ slug }: { slug: string }) => {
  return (
    <Link className="popover-btn" href={`/events/${slug}`}>
      <span>Settings</span>
    </Link>
  );
};

const DuplicateButton = ({ id }: { id: string }) => {
  return <button className="popover-btn">Duplicate</button>;
};

const ArchiveButton = ({ id }: { id: string }) => {
  return <button className="popover-btn">Archive</button>;
};
