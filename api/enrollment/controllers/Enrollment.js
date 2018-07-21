'use strict';

/**
 * Enrollment.js controller
 *
 * @description: A set of functions called "actions" for managing `Enrollment`.
 */

module.exports = {

  /**
   * Retrieve enrollment records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.enrollment.search(ctx.query);
    } else {
      return strapi.services.enrollment.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a enrollment record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.enrollment.fetch(ctx.params);
  },

  /**
   * Count enrollment records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.enrollment.count(ctx.query);
  },

  /**
   * Create a/an enrollment record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.enrollment.add(ctx.request.body);
  },

  /**
   * Update a/an enrollment record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.enrollment.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an enrollment record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.enrollment.remove(ctx.params);
  }
};
