"use client";

import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

const NewButton = () => {
  return (
    <Dialog>
      <Hint
        label="Create Organization"
        side="right"
        align="center"
        sideOffset={18}>
        <DialogTrigger asChild>
          <Button size="icon" variant="secondary" className="m-1">
            <Plus />
          </Button>
        </DialogTrigger>
      </Hint>
      <DialogContent className="max-w-96 border-none bg-transparent p-0">
        <CreateOrganization skipInvitationScreen hideSlug routing="virtual" />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
