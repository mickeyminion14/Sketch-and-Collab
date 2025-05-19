import { v } from "convex/values";
import { mutation } from "../_generated/server";

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
  "/placeholder/11.svg",
  "/placeholder/12.svg",
  "/placeholder/13.svg",
  "/placeholder/14.svg",
  "/placeholder/15.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    //get random image
    const image = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "Anonymous",
      imageUrl: image,
    });
    return board;
  },
});

export const deleteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", identity.subject).eq("boardId", args.id)
      )
      .unique();
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }
    await ctx.db.delete(args.id);
    return true;
  },
});

export const updateBoard = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const title = args.title.trim();

    if (!title || title.length < 1) {
      throw new Error("Title is required");
    }

    if (title.length > 60) {
      throw new Error("Title cannot be longer than 60 characters");
    }

    return await ctx.db.patch(args.id, {
      title,
    });
  },
});

export const favoriteBoard = mutation({
  args: {
    boardId: v.id("boards"),
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");
    const userId = identity.subject;

    const existing = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q
          .eq("userId", userId)
          .eq("boardId", args.boardId)
          .eq("orgId", args.orgId)
      )
      .unique();

    if (existing) {
      throw new Error("Board Already Favorited");
    }

    return await ctx.db.insert("userFavorites", {
      boardId: args.boardId,
      orgId: args.orgId,
      userId,
    });
  },
});

export const removeFavoriteBoard = mutation({
  args: {
    boardId: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const board = await ctx.db.get(args.boardId);
    if (!board) throw new Error("Board not found");
    const userId = identity.subject;

    const existing = await ctx.db
      .query("userFavorites")
      .withIndex(
        "by_user_board",
        (q) => q.eq("userId", userId).eq("boardId", args.boardId)
        // TODO : check if orgId is needed
      )
      .unique();

    if (!existing) {
      throw new Error("Favorited board not found");
    }

    return await ctx.db.delete(existing._id);
  },
});
