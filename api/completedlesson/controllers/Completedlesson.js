'use strict';

/**
 * Completedlesson.js controller
 *
 * @description: A set of functions called "actions" for managing `Completedlesson`.
 */

module.exports = {

  /**
   * Retrieve completedlesson records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.completedlesson.search(ctx.query);
    } else {
      return strapi.services.completedlesson.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a completedlesson record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.completedlesson.fetch(ctx.params);
  },

  /**
   * Count completedlesson records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.completedlesson.count(ctx.query);
  },

  /**
   * Create a/an completedlesson record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.completedlesson.add(ctx.request.body);
  },

  /**
   * Update a/an completedlesson record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.completedlesson.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an completedlesson record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.completedlesson.remove(ctx.params);
  }
};
