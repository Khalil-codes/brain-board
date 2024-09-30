import { Actions } from "@/components/board-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@convex/_generated/dataModel";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CardFooter from "./footer";

type Props = {
  board: Doc<"boards">;
  isFavorite?: boolean;
};

const BoardCard = ({ board, isFavorite }: Props) => {
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
          <div className="absolute right-0 top-0 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Actions id={board._id} title={board.title} side="right">
              <button className="p-3 outline-none">
                <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
              </button>
            </Actions>
          </div>
        </div>
        <CardFooter board={board} isFavorite={isFavorite} />
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
