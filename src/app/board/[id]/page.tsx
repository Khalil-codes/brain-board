import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import CanvasLoading from "./_components/loading";

type Props = {
  params: {
    id: string;
  };
};

const BoardPage = ({ params }: Props) => {
  return (
    <Room id={params.id} fallback={<CanvasLoading />}>
      <Canvas id={params.id} />;
    </Room>
  );
};

export default BoardPage;
