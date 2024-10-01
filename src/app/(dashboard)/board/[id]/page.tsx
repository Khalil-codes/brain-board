import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const BoardPage = ({ params }: Props) => {
  return <div>{params.id}</div>;
};

export default BoardPage;
