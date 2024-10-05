"use client";

import { useOrganization } from "@clerk/nextjs";
import React from "react";
import EmptyOrganization from "./_components/empty-states/organization";
import BoardList from "./_components/board-list";

type Props = {
  query: {
    search: string;
    favorites: string;
  };
};

const Client = ({ query }: Props) => {
  const { organization } = useOrganization();

  if (!organization) return <EmptyOrganization />;

  return <BoardList organizationId={organization.id} query={query} />;
};

export default Client;
