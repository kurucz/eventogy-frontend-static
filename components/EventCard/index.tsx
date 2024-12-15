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
import { archive, duplicate } from "./actions";
import { Badge } from "../ui/badge";
import {
  Archive,
  BookCopy,
  DraftingCompass,
  Earth,
  Ellipsis,
  Settings,
} from "lucide-react";

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
    <Card key={id} className="grid overflow-hidden">
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
        <CardDescription>
          <StatusBadge status={status} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        {date ? <p>{date}</p> : null}
        {location ? <p>{location}</p> : null}
      </CardContent>
      <CardFooter className="justify-end">
        <Popover>
          <PopoverTrigger>
            <Ellipsis />
          </PopoverTrigger>
          <PopoverContent className="grid grid-cols-1 gap-2">
            <SettingsButton slug={slug} />
            <DuplicateButton id={id} />
            <ArchiveButton id={id} />
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  if (status === "live") {
    return (
      <Badge variant="live">
        <Earth size={12} />
        Live
      </Badge>
    );
  }

  if (status === "draft") {
    return (
      <Badge variant="draft">
        <DraftingCompass size={12} />
        Draft
      </Badge>
    );
  }

  return null;
};

const SettingsButton = ({ slug }: { slug: string }) => {
  return (
    <Link className="popover-btn" href={`/events/${slug}`}>
      <Settings />
      <span>Settings</span>
    </Link>
  );
};

const DuplicateButton = ({ id }: { id: string }) => {
  const duplicateEventWithId = duplicate.bind(null, id);
  return (
    <form className="w-full" action={duplicateEventWithId}>
      <button type="submit" className="popover-btn">
        <BookCopy />
        <span>Duplicate</span>
      </button>
    </form>
  );
};

const ArchiveButton = ({ id }: { id: string }) => {
  const archiveEventWithId = archive.bind(null, id);
  return (
    <form className="w-full" action={archiveEventWithId}>
      <button type="submit" className="popover-btn">
        <Archive />
        <span>Archive</span>
      </button>
    </form>
  );
};
