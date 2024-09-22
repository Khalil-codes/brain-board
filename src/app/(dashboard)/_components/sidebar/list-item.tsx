"use client";

import Hint from "@/components/hint";
import { cn } from "@/lib/utils";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

const OrganisationItem = ({ imageUrl, id, name }: Props) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = id === organization?.id;

  const onClick = () => {
    if (isActive) return;
    setActive?.({ organization: id });
  };

  return (
    <Hint label={name} align="center" side="right" sideOffset={18}>
      <button
        onClick={onClick}
        className={cn(
          "cursor-pointer rounded-md border-primary-foreground/40 p-1 hover:border hover:bg-white/10",
          {
            "cursor-auto border bg-white/10": isActive,
          }
        )}>
        <Image
          src={imageUrl}
          alt={name}
          width={35}
          height={35}
          className={cn("rounded-md opacity-75 transition hover:opacity-100", {
            "opacity-100": isActive,
          })}
        />
      </button>
    </Hint>
  );
};

export default OrganisationItem;
