"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import React, { FormEvent } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useConvexMutation from "@/hooks/use-api-mutation";
import { api } from "@convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@convex/_generated/dataModel";

const RenameModal = () => {
  const { isOpen, onClose, initialValues } = useRenameModal();
  const { pending, mutate: update } = useConvexMutation(api.board.update);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get("title") as string;

    if (title === initialValues.title) {
      onClose();
      return;
    }

    toast.promise(
      async () =>
        await update({
          id: initialValues.id as Id<"boards">,
          title,
        }),
      {
        loading: "Renaming board...",
        success: () => {
          onClose();
          return "Board renamed!";
        },
        error: (error) => {
          return error.data ?? "Failed to rename board";
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename board</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter a new name for the board</DialogDescription>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <Input
            disabled={pending}
            name="title"
            required
            maxLength={60}
            defaultValue={initialValues.title}
            placeholder="Board Title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameModal;
