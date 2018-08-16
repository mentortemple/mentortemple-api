"use strict";

/**
 * Reply.js controller
 *
 * @description: A set of functions called "actions" for managing `Reply`.
 */

module.exports = {
  /**
   * Retrieve reply records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.reply.search(ctx.query);
    } else {
      return strapi.services.reply.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a reply record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.reply.fetch(ctx.params);
  },

  /**
   * Count reply records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.reply.count(ctx.query);
  },

  /**
   * Create a/an reply record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { user } = ctx.state;
    return strapi.services.reply.add({
      ...ctx.request.body,
      user: user._id
    });
  },

  /**
   * Update a/an reply record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.reply.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an reply record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.reply.remove(ctx.params);
  }
};
