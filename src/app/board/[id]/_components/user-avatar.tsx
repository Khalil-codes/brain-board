import Hint from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import React from "react";

type Props = Partial<{
  src: string;
  name: string;
  fallback: string;
  borderColor?: string;
  active?: boolean;
}>;

const UserAvatar = ({ src, name, fallback, borderColor, active }: Props) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
      <Avatar
        className={cn("h-8 w-8 border-2", { "ring-1": active })}
        style={
          { borderColor, "--tw-ring-color": borderColor } as React.CSSProperties
        }>
        <AvatarImage src={src} alt={name || "Teammate"} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback || name?.[0] || "TM"}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

export default UserAvatar;
