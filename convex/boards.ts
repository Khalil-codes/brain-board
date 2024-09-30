import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const get = query({
  args: {
    orgId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError("You must be logged in to get boards");
    }
    const _boards = await ctx.db
      .query("boards")
      .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
      .order("desc")
      .collect();

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
