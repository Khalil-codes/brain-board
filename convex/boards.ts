import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to get boards");
    }
    const search = args.search?.trim();
    let _boards: Array<Doc<"boards">> = [];

    if (args.favorites) {
      const favoritesIds = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .collect()
        .then((favorites) => favorites.map((favorite) => favorite.boardId));

      const boards = (await getAllOrThrow(ctx.db, favoritesIds)).map(
        (board) => {
          return { ...board, is_favorite: true };
        }
      );

      return boards;
    }

    if (search) {
      _boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      _boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const boards = await Promise.all(
      _boards.map(async (board) => {
        const isFavoritedByUser = await ctx.db
          .query("userFavorites")
          .withIndex("by_user_board", (q) =>
            q.eq("userId", identity.subject).eq("boardId", board._id)
          )
          .unique();
        return { ...board, is_favorite: !!isFavoritedByUser };
      })
    );

    return boards;
  },
});
