"use strict";

/**
 * Mentorshipapplication.js controller
 *
 * @description: A set of functions called "actions" for managing `Mentorshipapplication`.
 */

module.exports = {
  /**
   * Retrieve mentorshipapplication records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.mentorshipapplication.search(ctx.query);
    } else {
      return strapi.services.mentorshipapplication.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a mentorshipapplication record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.mentorshipapplication.fetch(ctx.params);
  },

  /**
   * Count mentorshipapplication records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.mentorshipapplication.count(ctx.query);
  },

  /**
   * Create a/an mentorshipapplication record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { _id: user } = ctx.state.user;
    const { course } = ctx.request.body;

    if (!course || !course.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const mentorshipapplication = await strapi.services.mentorshipapplication.fetch(
      { user, course }
    );

    if (mentorshipapplication) {
      return mentorshipapplication;
    }

    return strapi.services.mentorshipapplication.add({
      user,
      course,
      approved: false
    });
  },

  /**
   * Update a/an mentorshipapplication record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.mentorshipapplication.edit(
      ctx.params,
      ctx.request.body
    );
  },

  /**
   * Destroy a/an mentorshipapplication record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.mentorshipapplication.remove(ctx.params);
  }
};
