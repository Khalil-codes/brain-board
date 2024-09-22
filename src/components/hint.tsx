"use client";

import { TooltipContentProps } from "@radix-ui/react-tooltip";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  label: string;
} & TooltipContentProps;

const Hint = ({ children, label, ...contentProps }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          {...contentProps}
          className={cn(
            "border-primary/40 bg-primary text-primary-foreground",
            contentProps.className
          )}>
          <p className="font-semibold capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Hint;
