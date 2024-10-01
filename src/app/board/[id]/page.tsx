import React from "react";
import Canvas from "./_components/canvas";

type Props = {
  params: {
    id: string;
  };
};

const BoardPage = ({ params }: Props) => {
  return <Canvas id={params.id} />;
};

export default BoardPage;
