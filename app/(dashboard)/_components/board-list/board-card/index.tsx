"use client";
import Link from "next/link";
import { GetTypeWithSystemFields } from "../../../../../types";
import Image from "next/image";
import Overlay from "./overlay";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import Footer from "./footer";
import { Skeleton } from "../../../../../components/ui/skeleton";
import BoardActions from "../../../../../components/board/board-actions";
import { MoreHorizontal } from "lucide-react";

const BoardCard = ({
  board,
}: {
  board: GetTypeWithSystemFields<"boards"> & { isFavorite: boolean };
}) => {
  const { userId } = useAuth();
  const authorLabel = userId === board.authorId ? "You" : board.authorName;
  const createdAtLabel = formatDistanceToNow(board._creationTime, {
    addSuffix: true,
  });
  return (
    <Link href={`/board/${board._id}`}>
      <div
        className=" group aspect-[100/127] border rounded-lg flex 
    flex-col justify-between overflow-hidden"
      >
        <div className="relative flex-1 bg-amber-50">
          <Image
            src={board.imageUrl}
            alt={board.title}
            fill
            className="object-fit"
          />
          <Overlay />
          <BoardActions id={board._id} title={board.title} side={"right"}>
            <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </BoardActions>
        </div>
        <Footer
          board={board}
          createdAtLabel={createdAtLabel}
          authorLabel={authorLabel}
          isFavorite={board.isFavorite}
          disabled={false}
        />
      </div>
    </Link>
  );
};
BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className=" aspect-[100/127] rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
