"use client";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";
import SearchInput from "./search-input";

const Navbar = () => {
  return (
    <nav className="flex h-14 w-full items-center gap-x-4 border-b border-slate-200 px-5">
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
      <UserButton />
    </nav>
  );
};

export default Navbar;
