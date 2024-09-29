import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Doc } from "@convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  board: Doc<"boards">;
  isFavorite?: boolean;
};

const BoardCard = ({ board, isFavorite }: Props) => {
  const { userId } = useAuth();
  return (
    <Link href={`/board/${board._id}`}>
      <div className="group flex aspect-[100/127] flex-col justify-between rounded-lg border border-teal-200/60 bg-teal-50 hover:bg-teal-100/50">
        <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
          <div className="relative h-[60%] w-[90%]">
            <Image
              src={board.imageUrl}
              alt={board.title}
              fill
              className="object-fit"
            />
          </div>
          <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-30" />
          <div className="absolute right-2 top-2 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {/* Controls */}
          </div>
        </div>
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
            disabled={false}
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
      </div>
    </Link>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardSkeleton() {
  return (
    <div className="aspect-[100/127] rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
