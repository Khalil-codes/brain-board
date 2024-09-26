import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Doc } from "@convex/_generated/dataModel";
import { formatDistanceToNow } from "date-fns";
import { Dot, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  board: Doc<"boards">;
};

const BoardCard = ({ board }: Props) => {
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
        <div className="p-3">
          <h3 className="max-w-[calc(100%-1.25rem)] truncate text-sm">
            {board.title}
          </h3>
          <p className="truncate text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
            {board.authorId === userId ? "You" : board.authorName},{" "}
            {formatDistanceToNow(new Date(board._creationTime), {
              addSuffix: true,
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BoardCard;
