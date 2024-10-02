import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import CanvasLoading from "./_components/loading";
import { Id } from "@convex/_generated/dataModel";

type Props = {
  params: {
    id: string;
  };
};

const BoardPage = ({ params }: Props) => {
  return (
    <Room id={params.id} fallback={<CanvasLoading />}>
      <Canvas id={params.id as Id<"boards">} />
    </Room>
  );
};

export default BoardPage;
