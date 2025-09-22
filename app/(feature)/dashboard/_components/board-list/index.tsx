"use client";

import EmptyBoards from "../empty-boards";
import EmptyFavorites from "../empty-favorites";
import EmptySearch from "../empty-search";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
interface BoardList {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}
const BoardList = ({ orgId, query }: BoardList) => {
  const result = useQuery(api.queries.board.get, {
    orgId,
    ...query,
  });

  if (!result) {
    return (
      <div className="pr-5">
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
    lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"
        >
          <NewBoardButton orgId={orgId} disabled />
          {Array.from({ length: 9 }, (_, i) => i).map((i) => (
            <BoardCard.Skeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!result.length && query.search) return <EmptySearch />;

  if (!result.length && query.favorites) return <EmptyFavorites />;

  if (!result.length) return <EmptyBoards />;

  return (
    <div className="pr-5">
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
      lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"
      >
        <NewBoardButton orgId={orgId} />

        {result?.map((board) => <BoardCard key={board._id} board={board} />)}
      </div>
    </div>
  );
};

export default BoardList;
