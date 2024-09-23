import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import React from "react";

const InviteToOrganizationButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Plus size={16} />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit max-w-4xl border-none bg-transparent p-0">
        <OrganizationProfile routing="virtual" />
      </DialogContent>
    </Dialog>
  );
};

export default InviteToOrganizationButton;
