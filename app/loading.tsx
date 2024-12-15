import { EventCardSkeleton } from "@/components/EventCard";

const SkeletonNr = 8;

export default function Loading() {
  return (
    <div className="container mx-auto p-4 grid gap-4 grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(SkeletonNr)].map((_, i) => (
        <EventCardSkeleton />
      ))}
    </div>
  );
}
