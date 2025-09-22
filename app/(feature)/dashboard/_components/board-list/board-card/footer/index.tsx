import React from "react";
import { GetTypeWithSystemFields } from "../../../../../../../types";
import { Star } from "lucide-react";
import { cn } from "../../../../../../../lib/utils";
import useFooter from "./index.hook";

const Footer = ({
  board,
  isFavorite,
  authorLabel,
  createdAtLabel,
  disabled,
}: {
  board: GetTypeWithSystemFields<"boards">;
  isFavorite: boolean;
  authorLabel: string;
  createdAtLabel: string;
  disabled: boolean;
}) => {
  const { pendingFavorite, pendingRemoveFavorite, toggleFavorite } = useFooter({
    isFavorite,
    board: board,
  });
  return (
    <div className="relative bg-white p-3">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
        {board.title}
      </p>
      <p
        className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] 
      text-muted-foreground truncate"
      >
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        className={cn(
          `opacity-0 group-hover:opacity-100 absolute 
          top-3 right-3 text-muted-foreground hover:text-blue-600 transition-transform duration-300 delay-10 ease-out transform  hover:scale-150`,
          (disabled || pendingFavorite || pendingRemoveFavorite) &&
            "cursor-not-allowed opacity-75"
        )}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFavorite();
        }}
        disabled={disabled || pendingFavorite || pendingRemoveFavorite}
      >
        <Star
          className={cn(`h-4 w-4`, isFavorite && `fill-blue-600 text-blue-600`)}
        />
      </button>
    </div>
  );
};

export default Footer;
