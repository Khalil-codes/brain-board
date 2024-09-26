import Image from "next/image";
import React from "react";
import Favorite from "@/assets/chip.svg";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={Favorite} alt="No Favorite Boards" height={140} width={140} />
      <h2 className="mt-6 text-2xl font-semibold">
        No boards found in your favorites
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try adding some boards to your favorites
      </p>
    </div>
  );
};

export default EmptyFavorites;
