import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
];

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to create a board");
    }

    const randomImage = images[Math.floor(Math.random() * images.length)];
    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name || "",
      imageUrl: randomImage,
    });

    return board;
  },
});

export const remove = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to remove a board");
    }

    const favoritesExists = await ctx.db
      .query("userFavorites")
      .withIndex("by_board", (q) => q.eq("boardId", args.id))
      .collect();

    if (favoritesExists.length > 0) {
      await Promise.all(
        favoritesExists.map(async (fav) => await ctx.db.delete(fav._id))
      );
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: {
    id: v.id("boards"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to update a board");
    }

    const title = args.title?.trim();
    if (!title || title.length > 60) {
      throw new ConvexError("Title must be between 1 and 60 characters");
    }

    const board = await ctx.db.patch(args.id, { title });

    return board;
  },
});

export const favorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to favorite a board");
    }
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new ConvexError("Board not available");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", args.id).eq("orgId", board.orgId)
      )
      .unique();

    if (existingFavorite) {
      throw Error("Board already favorited by user");
    }

    await ctx.db.insert("userFavorites", {
      boardId: board._id,
      orgId: board.orgId,
      userId,
    });

    return board;
  },
});

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to favorite a board");
    }
    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new ConvexError("Board not available");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("userId", userId).eq("boardId", args.id).eq("orgId", board.orgId)
      )
      .unique();

    if (!existingFavorite) {
      throw Error("Board not favorited by user");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});
