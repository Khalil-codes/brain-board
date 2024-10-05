import React from "react";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import CanvasLoading from "./_components/loading";
import { Id } from "@convex/_generated/dataModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@convex/_generated/api";

type Props = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: Props) => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

  try {
    const board = await convex.query(api.board.get, {
      id: params.id as Id<"boards">,
    });

    if (!board) {
      return {
        title: "Board not found",
      };
    }

    return {
      title: `${board.title} | Brain Board`,
    };
  } catch (error) {
    return {
      title: "Board not found",
    };
  }
};

const BoardPage = ({ params }: Props) => {
  return (
    <Room id={params.id} fallback={<CanvasLoading />}>
      <Canvas id={params.id as Id<"boards">} />
    </Room>
  );
};

export default BoardPage;
