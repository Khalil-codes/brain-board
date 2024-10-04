import { Button } from "@/components/ui/button";
import useConvexMutation from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { api } from "@convex/_generated/api";
import { Doc } from "@convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  board: Doc<"boards">;
  isFavorite?: boolean;
};

const CardFooter = ({ board, isFavorite }: Props) => {
  const { userId } = useAuth();

  const { pending: favoritePending, mutate: favorite } = useConvexMutation(
    api.board.favorite
  );
  const { pending: unfavoritePending, mutate: unfavorite } = useConvexMutation(
    api.board.unfavorite
  );

  const toggleFavorite = async () => {
    if (!board) return;

    if (isFavorite) {
      toast.promise(async () => await unfavorite({ id: board._id }), {
        error: "Failed to unfavorite board",
      });
    } else {
      toast.promise(async () => await favorite({ id: board._id }), {
        error: (data) => {
          console.error(data);
          return "Failed to favorite board";
        },
      });
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleFavorite();
  };

  return (
    <div className="relative p-3">
      <h3 className="max-w-[calc(100%-1.25rem)] truncate text-sm">
        {board.title}
      </h3>
      <p className="truncate text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        {board.authorId === userId ? "You" : board.authorName},{" "}
        {formatDistanceToNow(new Date(board._creationTime), {
          addSuffix: true,
        })}
      </p>
      <Button
        variant="link"
        size="icon"
        onClick={handleClick}
        disabled={favoritePending || unfavoritePending}
        className={cn(
          "absolute right-0 top-1.5 text-muted-foreground opacity-0 transition hover:text-blue-600 group-hover:opacity-100",
          { "cursor-not-allowed opacity-75": false }
        )}>
        <Star
          size={16}
          className={isFavorite ? "fill-blue-600 text-blue-600" : ""}
        />
      </Button>
    </div>
  );
};

export default CardFooter;
