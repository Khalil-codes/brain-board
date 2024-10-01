"use client";

import React from "react";
import EmptySearch from "./empty-states/search";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import EmptyFavorites from "./empty-states/favorites";
import EmptyBoard from "./empty-states/board";
import BoardCard from "./board-card";
import CreateBoardButton from "./create-board";

type Props = {
  organizationId: string;
  query: {
    search: string;
    favorites: string;
  };
};

const BoardList = ({ organizationId, query }: Props) => {
  const boards = useQuery(api.boards.get, {
    orgId: organizationId,
    search: query.search,
    favorites: !!query.favorites,
  });

  if (typeof boards === "undefined") {
    return (
      <div className="flex flex-1 flex-col">
        <h2 className="text-3xl font-semibold">
          {query.favorites ? "Favorite" : "Team"} Boards
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <CreateBoardButton organizationId={organizationId} disabled={true} />
          {Array(4)
            .fill(0)
            .map((_, index) => {
              return <BoardCard.Skeleton key={index} />;
            })}
        </div>
      </div>
    );
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
        <CreateBoardButton organizationId={organizationId} disabled={false} />
        {boards.map((board) => {
          return (
            <BoardCard
              key={board._id}
              board={board}
              isFavorite={board.is_favorite}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BoardList;
