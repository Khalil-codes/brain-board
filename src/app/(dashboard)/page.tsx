"use client";

import { useOrganization } from "@clerk/nextjs";
import EmptyOrganization from "./_components/empty-states/organization";
import BoardList from "./_components/board-list";

type Props = {
  searchParams: {
    search: string;
    favorites: string;
  };
};

export default function Dashboard({ searchParams }: Props) {
  const { organization } = useOrganization();
  return (
    <div className="flex flex-1 flex-col p-6">
      {organization ? (
        <BoardList organizationId={organization.id} query={searchParams} />
      ) : (
        <EmptyOrganization />
      )}
    </div>
  );
}
