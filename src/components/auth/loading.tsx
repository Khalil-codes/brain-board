import Image from "next/image";
import React from "react";
import Logo from "@/assets/logo.svg";

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Image
        src={Logo}
        alt="Brain Board Logo"
        width={150}
        height={150}
        className="animate-pulse duration-700"
      />
    </div>
  );
};

export default Loading;
