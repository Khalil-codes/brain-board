"use client";

import React from "react";
import EmptySearch from "./empty-states/search";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import EmptyFavorites from "./empty-states/favorites";
import EmptyBoard from "./empty-states/board";
import BoardCard from "./board-card";

type Props = {
  organizationId: string;
  query: {
    search: string;
    favorites: string;
  };
};

const BoardList = ({ organizationId, query }: Props) => {
  const boards = useQuery(api.boards.get, { orgId: organizationId });

  if (typeof boards === "undefined") {
    return <div>Loading...</div>;
  }

  if (query.search && boards.length === 0) {
    return <EmptySearch search={query.search} />;
  }

  if (query.favorites && boards.length === 0) {
    return <EmptyFavorites />;
  }

  if (boards.length === 0) {
    return <EmptyBoard />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <h2 className="text-3xl font-semibold">
        {query.favorites ? "Favorite" : "Team"} Boards
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {boards.map((board) => {
          return <BoardCard key={board._id} board={board} />;
        })}
      </div>
    </div>
  );
};

export default BoardList;
