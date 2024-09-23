"use client";

import {
  OrganizationSwitcher,
  useOrganization,
  UserButton,
} from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";
import InviteToOrganizationButton from "./invite-button";

const Navbar = () => {
  const { organization } = useOrganization();
  return (
    <nav className="flex w-full items-center gap-x-4 px-5 py-4">
      <div className="hidden lg:flex lg:flex-1">
        <SearchInput />
      </div>
      <div className="block flex-1 lg:hidden">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                maxWidth: "376px",
              },
              organizationSwitcherTrigger: {
                padding: "0.5rem",
                borderRadius: "0.5rem",
                width: "100%",
                border: "1px solid #e5e7eb",
                justifyContent: "space-between",
                backgroundColor: "white",
              },
            },
          }}
        />
      </div>
      {organization && <InviteToOrganizationButton />}
      <UserButton />
    </nav>
  );
};

export default Navbar;
