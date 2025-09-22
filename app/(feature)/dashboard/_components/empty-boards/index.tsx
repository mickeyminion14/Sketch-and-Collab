"use client";

import Image from "next/image";
import { Button } from "../../../../../components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "../../../../../hooks/use-api-mutation";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { GetTypeWithoutSystemFields } from "../../../../../types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { pending, mutate } = useApiMutation<
    Omit<
      GetTypeWithoutSystemFields<"boards">,
      "authorId" | "authorName" | "imageUrl"
    >
  >(api.mutations.board.create);

  const onClick = async () => {
    if (!organization) return;
    try {
      const id = await mutate({
        orgId: organization?.id,
        title: "New Board",
      });
      toast.success("Board created successfully");
      //redirect to the board
      router.push(`/board/${id}`);
    } catch (error) {
      toast.error("Failed to create board");
    }
  };
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty" src={"/empty.svg"} height={110} width={110} />
      <h2 className="text-2xl font-semibold mt-6">Create your first board</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Start by creating a board for you organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size={"lg"}>
          Create board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
