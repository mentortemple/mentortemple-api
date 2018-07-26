"use strict";

/**
 * Mentorshipapplication.js controller
 *
 * @description: A set of functions called "actions" for managing `Mentorshipapplication`.
 */


function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

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
    const { user } = ctx.state;
    const { course: courseId } = ctx.request.body;

    if (!courseId || !courseId.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    const course = await strapi.services.course.fetch({ _id: courseId });

    const mentorshipapplication = await strapi.services.mentorshipapplication.fetch(
      { user: user._id, course: courseId }
    );

    if (mentorshipapplication) {
      return mentorshipapplication;
    }

    return strapi.services.mentorshipapplication.add({
      user: user._id,
      course: courseId,
      approved: false,
      name: slugify(`${user.username}-${course.title}`)
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
