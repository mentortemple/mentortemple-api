"use strict";

/**
 * Comment.js controller
 *
 * @description: A set of functions called "actions" for managing `Comment`.
 */

module.exports = {
  /**
   * Retrieve comment records.
   *
   * @return {Object|Array}
   */

  find: async ctx => {
    if (ctx.query._q) {
      return strapi.services.comment.search(ctx.query);
    } else {
      return strapi.services.comment.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a comment record.
   *
   * @return {Object}
   */

  findOne: async ctx => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.comment.fetch(ctx.params);
  },

  /**
   * Count comment records.
   *
   * @return {Number}
   */

  count: async ctx => {
    return strapi.services.comment.count(ctx.query);
  },

  /**
   * Create a/an comment record.
   *
   * @return {Object}
   */

  create: async ctx => {
    const { _id: user } = ctx.state.user;
    const {
      submission: submissionId,
      comment,
      approved = false
    } = ctx.request.body;

    if (!submissionId.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    const submission = await strapi.services.submission.fetch({ _id: submissionId });

    if (approved) {
      // TODO: SEND EMAIL TO USER INFORMING HIM THAT FEEDBACK HAS BEEN GIVEN AND SUBMISSION APPROVED.
      await strapi.services.completedlesson.add({
        lesson: submission.lesson.id,
        user: submission.user.id,
        course: submission.course.id
      });
      //TODO: REMOVE THE STATUS FROM SUBMISSION. IT'S NOT NEEDED. ALL SHOULD DEPEND ON IF THE LESSON IS COMPLETED OR NOT.

      await strapi.services.submission.edit(
        { _id: submissionId },
        { status: 'accepted' }
      );
    }

    // TODO: SEND EMAIL TO USER INFORMING HIM THAT FEEDBACK HAS BEEN GIVEN ON SUBMISSION.

    //TODO: make sure only mentor of enrollment or user of enrollment can post comments for this submission.

    let newComment = await strapi.services.comment.add({
      submission: submissionId,
      user,
      comment
    }); 

    newComment.submission = await strapi.services.submission.fetch({ _id: submissionId });

    return newComment;
  },

  /**
   * Update a/an comment record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.comment.edit(ctx.params, ctx.request.body);
  },

  /**
   * Destroy a/an comment record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.comment.remove(ctx.params);
  }
};
