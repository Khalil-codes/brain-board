"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@convex/_generated/dataModel";
import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { notFound } from "next/navigation";
import Hint from "@/components/hint";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { Actions } from "@/components/board-actions";
import { Menu } from "lucide-react";

type Props = {
  id: Id<"boards">;
};

const Info = ({ id }: Props) => {
  const board = useQuery(api.board.get, {
    id,
  });

  const { onOpen } = useRenameModal();

  if (typeof board === "undefined") {
    return <Info.Skeleton />;
  }

  if (!board) {
    return notFound();
  }

  return (
    <div className="absolute left-2 top-2 flex h-14 items-center gap-2 rounded-md bg-white p-3 shadow-md">
      <Hint label="Go to boards" align="center" side="bottom" sideOffset={10}>
        <Link href="/" className="flex items-center gap-2 px-2">
          <Image src={Logo} alt="Brain Board Logo" width={30} height={30} />
          <span className="text-xl font-semibold">BrainBoard</span>
        </Link>
      </Hint>
      <Separator
        orientation="vertical"
        className="h-[80%] w-[2px] border-neutral-300"
      />
      <Hint label="Rename" align="center" side="bottom" sideOffset={10}>
        <button
          type="button"
          onClick={() => onOpen(board._id, board.title)}
          className="max-w-[30ch] truncate px-2 hover:underline">
          {board.title}
        </button>
      </Hint>
      <Separator
        orientation="vertical"
        className="h-[80%] w-[2px] border-neutral-300"
      />
      <Actions
        id={board._id}
        title={board.title}
        side="bottom"
        sideOffset={14}
        align="start">
        <div>
          <Hint label="Main Menu" side="right" sideOffset={10}>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute left-2 top-2 rounded-md shadow-md">
      <Skeleton className="h-14 w-72 bg-neutral-300" />
    </div>
  );
};

export default Info;
