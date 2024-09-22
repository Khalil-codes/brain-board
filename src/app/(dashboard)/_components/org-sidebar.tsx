"use client";

import React from "react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo.svg";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

const OrganisationSidebar = () => {
  const searchParams = useSearchParams();

  const isFavorites = searchParams.get("favorites") === "true";

  return (
    <div className="hidden min-w-48 flex-col gap-4 bg-background px-4 pt-4 lg:flex">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Brain Board Logo" width={30} height={30} />{" "}
        <span className={cn("text-xl font-semibold", font.className)}>
          Brain Board
        </span>
      </Link>
      <OrganizationSwitcher
        hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
      <div className="flex w-full flex-col gap-1">
        <Button
          className="flex w-full justify-start gap-2 px-2 font-normal"
          variant={!isFavorites ? "secondary" : "ghost"}
          asChild>
          <Link href="/">
            <LayoutDashboard size={20} /> Team Boards
          </Link>
        </Button>
        <Button
          className="flex w-full justify-start gap-2 px-2 font-normal"
          variant={isFavorites ? "secondary" : "ghost"}
          asChild>
          <Link href={{ pathname: "/", query: { favorites: true } }}>
            <Star size={20} /> Favourites
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default OrganisationSidebar;
