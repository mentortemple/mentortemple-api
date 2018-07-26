'use strict';

/**
 * Course.js controller
 *
 * @description: A set of functions called "actions" for managing `Course`.
 */

module.exports = {

  /**
   * Retrieve course records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    let courses;
    if (ctx.query._q) {
      courses = await strapi.services.course.search(ctx.query);
    } else {
      courses = await strapi.services.course.fetchAll(ctx.query);
    }

    return {
      courses,
      count: await strapi.services.course.count(ctx.query)
    };
  },

  /**
   * Retrieve a course record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.course.fetch(ctx.params);
  },

  /**
   * Count course records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.course.count(ctx.query);
  },

  /**
   * Create a/an course record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.course.add(ctx.request.body);
  },

  /**
   * Update a/an course record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.course.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an course record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.course.remove(ctx.params);
  },

  /**
   * Get all courses mentored by authenticated user.
   */
  getMentoredCourses: async (ctx) => {
    const { _id: mentor } = ctx.state.user;

    let enrollments = await strapi.services.enrollment.fetchAll({ mentor });

    enrollments = await Promise.all(
      enrollments.map(
        async enrollment => {
          enrollment.submissions = await Promise.all(
            enrollment.submissions.map(
              async submission => {
                submission.lesson = await strapi.services.lesson.fetch({ _id: submission.lesson });
                
                return submission;
              }
            )
          );

          return enrollment;
        })
    );

    return enrollments;
  },

  /**
   * Get all courses user is enrolled into and all courses user is mentoring.
   */
  getEnrolledAndMentoredCourses: async (ctx) => {
    const { _id: user } = ctx.state.user;

    const { _id: mentor } = ctx.state.user;

    let mentorshipEnrollments = await strapi.services.enrollment.fetchAll({ mentor });

    mentorshipEnrollments = await Promise.all(
      mentorshipEnrollments.map(
        async enrollment => {
          enrollment.submissions = await Promise.all(
            enrollment.submissions.map(
              async submission => {
                submission.lesson = await strapi.services.lesson.fetch({ _id: submission.lesson });
                
                return submission;
              }
            )
          );

          return enrollment;
        })
    );

    let enrollments = await strapi.services.enrollment.fetchAll({ user });

    enrollments = await Promise.all(
      enrollments.map(
        async enrollment => {
          enrollment.course = await strapi.services.course.fetch({ _id: enrollment.course.id });

          enrollment.submissions = await Promise.all(
            enrollment.submissions.map(
              async submission => {
                submission.lesson = await strapi.services.lesson.fetch({ _id: submission.lesson });
                
                return submission;
              }
            )
          );

          return enrollment;
        }
      )
    );

    return {
      enrollments,
      mentorshipEnrollments
    };
  }
};
