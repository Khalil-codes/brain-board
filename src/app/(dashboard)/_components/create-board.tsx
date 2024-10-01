import useConvexMutation from "@/hooks/use-api-mutation";
import { api } from "@convex/_generated/api";
import { Loader, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {
  organizationId: string;
  disabled: boolean;
};

const CreateBoardButton = ({ organizationId, disabled }: Props) => {
  const { pending, mutate: create } = useConvexMutation(api.board.create);
  const router = useRouter();

  const handleClick = async () => {
    if (!organizationId) return;

    toast.promise(
      async () =>
        await create({
          title: "Untitled",
          orgId: organizationId,
        }),
      {
        loading: "Creating board...",
        success: (id) => {
          router.push(`/board/${id}`);
          return "Board created!";
        },
        error: "Failed to create board",
      }
    );
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={handleClick}
      className="col-span-1 flex aspect-[100/127] flex-col items-center justify-center rounded-lg border border-teal-200/60 bg-white hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:bg-white">
      {pending ? (
        <Loader size={28} className="animate-spin" />
      ) : (
        <Plus size={28} />
      )}
      {pending ? "Creating..." : "Create Board"}
    </button>
  );
};

export default CreateBoardButton;
