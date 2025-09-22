"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Image from "next/image";
import { cn } from "../../../../../lib/utils";
import { Button } from "../../../../../components/ui/button";
import { font } from "../../../../../lib/font";
import Link from "next/link";
import Hint from "../../../../../components/common/hint";
import { useRenameModal } from "../../../../../store/use-rename-modal";
import BoardActions from "../../../../../components/board/board-actions";
import { Menu } from "lucide-react";

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>;
};

export const Info = ({ boardId }: { boardId: string }) => {
  const { onOpen } = useRenameModal();

  const data = useQuery(api.queries.board.getById, {
    id: boardId as Id<"boards">,
  });
  if (!data) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Go To Boards" side="bottom" sideOffset={10}>
        <Button asChild variant={"board"} className="px-2">
          <Link href={"/dashboard"}>
            <Image src={"/logo.svg"} alt="Board Logo" height={40} width={40} />
            <span
              className={cn(
                "fonts-semibold text-xl ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Board Title (Click to Edit)" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant={"board"}
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <BoardActions
        id={data._id}
        title={data.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button size={"icon"} variant={"board"}>
              <Menu />
            </Button>
          </Hint>
        </div>
      </BoardActions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"></div>
  );
};
