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
    const { _id: user } = ctx.state.user;
    const { lesson, course } = ctx.request.body;

    if (!lesson || !lesson.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    if (!course || !course.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const completedlesson = await strapi.services.completedlesson.fetch({ user, lesson, course });

    if (completedlesson) {
      return strapi.services.completedlesson.remove({ _id: completedlesson.id });
    }

    return strapi.services.completedlesson.add({ lesson, user, course });
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
