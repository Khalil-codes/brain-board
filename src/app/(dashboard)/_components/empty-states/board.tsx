import Image from "next/image";
import React from "react";
import Board from "@/assets/plan.svg";
import { Button } from "@/components/ui/button";

const EmptyBoard = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={Board} alt="No Favorite Boards" height={140} width={140} />
      <h2 className="mt-6 text-2xl font-semibold">Create a new board</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a new board
      </p>
      <div className="mt-6">
        <Button size="lg">Create Board</Button>
      </div>
    </div>
  );
};

export default EmptyBoard;
