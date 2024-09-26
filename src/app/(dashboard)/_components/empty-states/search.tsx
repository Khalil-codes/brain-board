import React from "react";
import Search from "@/assets/magnifier.svg";
import Image from "next/image";

type Props = {
  search: string;
};

const EmptySearch = ({ search }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={Search} alt="No Boards" height={140} width={140} />
      <h2 className="mt-6 text-2xl font-semibold">
        Nothing found for <b>{search}</b>
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try searching for something else
      </p>
    </div>
  );
};

export default EmptySearch;
