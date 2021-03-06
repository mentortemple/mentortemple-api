'use strict';

/**
 * Submission.js controller
 *
 * @description: A set of functions called "actions" for managing `Submission`.
 */

module.exports = {

  /**
   * Retrieve submission records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.submission.search(ctx.query);
    } else {
      return strapi.services.submission.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a submission record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.submission.fetch(ctx.params);
  },

  /**
   * Count submission records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.submission.count(ctx.query);
  },

  /**
   * Create a/an submission record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    // return strapi.services.submission.add(ctx.request.body);

    const { _id: user } = ctx.state.user;
    const { lesson, course, url, description, enrollment } = ctx.request.body;

    if (!lesson || !lesson.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    if (!course || !course.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    if (!enrollment || !enrollment.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.submission.add({ lesson, user, course, enrollment, url,description });
  },

  /**
   * Update a/an submission record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.submission.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an submission record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.submission.remove(ctx.params);
  }
};
