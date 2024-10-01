import React from "react";
import Canvas from "./_components/canvas";

type Props = {
  params: {
    id: string;
  };
};

const BoardPage = ({ params }: Props) => {
  return (
    <div>
      <Canvas />
    </div>
  );
};

export default BoardPage;
