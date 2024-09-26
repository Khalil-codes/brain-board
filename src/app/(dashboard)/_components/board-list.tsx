"use client";

import React from "react";
import EmptySearch from "./empty-states/search";
import EmptyFavorites from "./empty-states/favorites";
import EmptyBoard from "./empty-states/board";

type Props = {
  organizationId: string;
  query: {
    search: string;
    favorites: string;
  };
};

// Remove
const data = [];

const BoardList = ({ organizationId, query }: Props) => {
  if (query.search && data.length === 0) {
    return <EmptySearch search={query.search} />;
  }

  if (query.favorites && data.length === 0) {
    return <EmptyFavorites />;
  }

  if (data.length === 0) {
    return <EmptyBoard />;
  }

  return <div>{organizationId}</div>;
};

export default BoardList;
