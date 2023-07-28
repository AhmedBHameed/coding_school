import COMMON_PAGINATION_INPUT_CONFIG_TYPES from './_common/paginationInputConfig.typedef';
import CourseDataSource from './course/course.datasource';
import CourseResolvers from './course/course.resolvers';
import COURSE_TYPES from './course/course.typedef';
import FeedbackDataSource from './feedback/feedback.datasource';
import FeedbackResolvers from './feedback/feedback.resolvers';
import FEEDBACK_TYPES from './feedback/feedback.typedef';
import PostDataSource from './post/post.datasource';
import PostResolvers from './post/post.resolvers';
import POST_TYPES from './post/post.typedef';
import PostContentDataSource from './postContent/postContent.datasource';
import PostContentResolvers from './postContent/postContent.resolvers';
import POST_CONTENT_TYPES from './postContent/postContent.typedef';
import TagDataSource from './tag/tag.datasource';
import TagResolvers from './tag/tag.resolvers';
import TAG_TYPES from './tag/tag.typedef';

// Resolvers
export {
  CourseResolvers,
  FeedbackResolvers,
  PostContentResolvers,
  PostResolvers,
  TagResolvers,
};

// DataSource
export {
  CourseDataSource,
  FeedbackDataSource,
  PostContentDataSource,
  PostDataSource,
  TagDataSource,
};

// Types
export {
  COMMON_PAGINATION_INPUT_CONFIG_TYPES,
  COURSE_TYPES,
  FEEDBACK_TYPES,
  POST_CONTENT_TYPES,
  POST_TYPES,
  TAG_TYPES,
};
