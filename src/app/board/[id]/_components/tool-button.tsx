"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
};

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <Hint label={label} side="right" sideOffset={10}>
      <Button
        size="icon"
        variant={isActive ? "board-active" : "board"}
        onClick={onClick}
        disabled={isDisabled}>
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
