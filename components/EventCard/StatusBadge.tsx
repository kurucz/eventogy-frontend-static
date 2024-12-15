import { DraftingCompass, Earth } from "lucide-react";
import { Badge } from "../ui/badge";

export default function StatusBadge({ status }: { status: string }) {
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
}
