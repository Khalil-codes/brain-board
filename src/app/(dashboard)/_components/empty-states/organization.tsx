import React from "react";
import Empty from "@/assets/brush.svg";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

const EmptyOrganization = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <Image src={Empty} alt="No Projects" height={200} width={200} />
      <h2 className="mt-6 text-2xl font-semibold">Welcome to BrainBoard</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={16} />
              Create Organization
            </Button>
          </DialogTrigger>
          <DialogContent className="w-fit max-w-4xl border-none bg-transparent p-0">
            <CreateOrganization routing="virtual" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default EmptyOrganization;
