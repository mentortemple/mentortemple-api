"use strict";

/**
 * Discussion.js controller
 *
 * @description: A set of functions called "actions" for managing `Discussion`.
 */

module.exports = {
  /**
   * Retrieve discussion records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.discussion.search(ctx.query);
    } else {
      let discussions = await strapi.services.discussion.fetchAll(ctx.query);

      discussions = await Promise.all(
        discussions.map(async discussion => {
          discussion.discussion_replies = await Promise.all(
            discussion.discussion_replies.map(
              async reply =>
                await strapi.services.reply.fetch({
                  _id: reply._id
                })
            )
          );

          return discussion;
        })
      );

      return discussions;
    }
  },

  /**
   * Retrieve a discussion record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    let discussion = await strapi.services.discussion.fetch(ctx.params);

    if (discussion) {
      discussion.discussion_replies = await Promise.all(
        discussion.discussion_replies.map(
          async reply => await strapi.services.reply.fetch({ _id: reply._id })
        )
      );
    }

    return discussion;
  },

  /**
   * Count discussion records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.discussion.count(ctx.query);
  },

  /**
   * Create a/an discussion record.
   *
   * @return {Object}
   */

  create: async ctx => {
    return strapi.services.discussion.add(ctx.request.body);
  },

  /**
   * Update a/an discussion record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.discussion.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an discussion record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.discussion.remove(ctx.params);
  }
};
