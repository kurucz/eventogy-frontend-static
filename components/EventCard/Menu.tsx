import { Archive, BookCopy, EllipsisVertical, Settings } from "lucide-react";
import { archive, duplicate } from "./actions";
import { PopoverContent, Popover, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

export default function Menu({ id, slug }: { id: string; slug: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <EllipsisVertical />
      </PopoverTrigger>
      <PopoverContent className="grid grid-cols-1 gap-2">
        <SettingsButton slug={slug} />
        <DuplicateButton id={id} />
        <ArchiveButton id={id} />
      </PopoverContent>
    </Popover>
  );
}

function SettingsButton({ slug }: { slug: string }) {
  return (
    <Link className="popover-btn" href={`/events/${slug}`}>
      <Settings />
      <span>Settings</span>
    </Link>
  );
}

function DuplicateButton({ id }: { id: string }) {
  const duplicateEventWithId = duplicate.bind(null, id);
  return (
    <form className="w-full" action={duplicateEventWithId}>
      <button type="submit" className="popover-btn">
        <BookCopy />
        <span>Duplicate</span>
      </button>
    </form>
  );
}

function ArchiveButton({ id }: { id: string }) {
  const archiveEventWithId = archive.bind(null, id);
  return (
    <form className="w-full" action={archiveEventWithId}>
      <button type="submit" className="popover-btn">
        <Archive />
        <span>Archive</span>
      </button>
    </form>
  );
}
