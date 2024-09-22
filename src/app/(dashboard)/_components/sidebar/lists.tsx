"use client";

import { useOrganizationList } from "@clerk/nextjs";
import React from "react";
import OrganisationItem from "./list-item";

const OrganisationsList = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (userMemberships.data?.length === 0) return null;

  return (
    <ul className="flex flex-col gap-2">
      {userMemberships.data?.map((membership) => (
        <OrganisationItem
          key={membership.organization.id}
          id={membership.organization.id}
          name={membership.organization.name}
          imageUrl={membership.organization.imageUrl}
        />
      ))}
    </ul>
  );
};

export default OrganisationsList;
