import { v } from "convex/values";
import { query } from "../_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    if (args.favorites) {
      const favoritedBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favoritedBoards.map((board) => board.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);
      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }
    const title = args.search as string;
    let boards = [];
    if (title && title.length > 0) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    // Fetch all favorites for this user in this org
    const favorites = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_org", (q) =>
        q.eq("userId", identity.subject).eq("orgId", args.orgId)
      )
      .collect();

    const favoriteBoardIds = new Set(
      favorites.map((f) => f.boardId.toString())
    );

    // Add isFavorite field to each board
    const boardsWithFavorite = boards.map((board) => ({
      ...board,
      isFavorite: favoriteBoardIds.has(board._id.toString()),
    }));

    return boardsWithFavorite;
  },
});
