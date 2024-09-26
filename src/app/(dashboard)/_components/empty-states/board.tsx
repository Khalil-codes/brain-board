"use client";

import Image from "next/image";
import React from "react";
import Board from "@/assets/plan.svg";
import { Button } from "@/components/ui/button";
import { api } from "@convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import useConvexMutation from "@/hooks/use-api-mutation";
import { toast } from "sonner";

const EmptyBoard = () => {
  const { pending, mutate: create } = useConvexMutation(api.boards.create);
  const { organization } = useOrganization();

  const handleClick = async () => {
    if (!organization) return;

    toast.promise(
      async () =>
        await create({
          title: "My First Board",
          orgId: organization.id,
        }),
      {
        loading: "Creating board...",
        success: (data) => {
          console.log(data);
          return "Board created!";
        },
        error: "Failed to create board",
      }
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={Board} alt="No Favorite Boards" height={140} width={140} />
      <h2 className="mt-6 text-2xl font-semibold">Create a new board</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a new board
      </p>
      <div className="mt-6">
        <Button size="lg" disabled={pending} onClick={handleClick}>
          Create Board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
