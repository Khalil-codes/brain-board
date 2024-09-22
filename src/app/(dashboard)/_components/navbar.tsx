"use client";

import { UserButton } from "@clerk/nextjs";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex h-14 w-full items-center gap-x-4 border-b border-slate-200 px-5">
      <div className="hidden lg:flex lg:flex-1"></div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
