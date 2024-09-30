"use client";

import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link2, Trash } from "lucide-react";
import { toast } from "sonner";
import useConvexMutation from "@/hooks/use-api-mutation";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
  id: Id<"boards">;
  title: string;
} & DropdownMenuContentProps;

export const Actions = ({ children, id, ...props }: Props) => {
  const { pending, mutate: remove } = useConvexMutation(api.board.remove);

  const onDelete = () => {
    toast.promise(async () => await remove({ id }), {
      loading: "Deleting board...",
      success: "Board deleted!",
      error: "Failed to delete board",
    });
  };

  const onCopyLink = () => {
    toast.promise(
      navigator.clipboard.writeText(`${window.location.origin}/board/${id}`),
      {
        loading: "Copying link...",
        success: "Link copied!",
        error: "Failed to copy link",
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        id={id}
        {...props}
        className={cn("w-56", props.className)}
        onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem
          className="flex cursor-pointer gap-2 p-3"
          onClick={onCopyLink}>
          <Link2 size={16} /> Copy Link
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Board?"
          description="This will permanently delete this board."
          disabled={pending}
          onConfirm={onDelete}>
          <Button
            variant={"ghost"}
            disabled={pending}
            className="flex w-full cursor-pointer justify-start gap-2 p-3 text-sm font-normal">
            <Trash size={16} /> Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
