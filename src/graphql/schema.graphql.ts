import {buildSubgraphSchema} from '@apollo/federation';
import {mergeResolvers, mergeTypeDefs} from '@graphql-tools/merge';
import {gql} from 'apollo-server-express';
import {writeFileSync} from 'fs';
import {printIntrospectionSchema} from 'graphql';
import {
  PositiveIntResolver,
  PositiveIntTypeDefinition as POSITIVE_INT_TYPE_DEFINITION,
} from 'graphql-scalars';

import {
  COMMON_PAGINATION_INPUT_CONFIG_TYPES,
  COURSE_TYPES,
  CourseResolvers,
  FEEDBACK_TYPES,
  FeedbackResolvers,
  POST_CONTENT_TYPES,
  POST_TYPES,
  PostContentResolvers,
  PostResolvers,
  TAG_TYPES,
  TagResolvers,
} from './resolvers';
import COMMON_PAGINATION_TYPES from './resolvers/_common/pagination.typedef';

const typeDefs = gql`
  """
  \`ISO 8601\` date format. E.g: 2021-08-09T09:45:16.696Z
  """
  scalar Date

  enum LanguageEnum {
    en
    ar
  }

  enum SortingEnum {
    ASC
    DESC
  }

  extend type User @key(fields: "id") {
    id: ID! @external
  }

  extend type Query {
    listPublicPosts(query: String): [Post]
    getPublicPost(nanoId: ID!, slug: String!): Post

    listCourses(query: String): [Course]

    totalCourses: Int
    totalPosts: Int
    totalFreeArticles: Int

    getCourse(courseId: String!): Course
    getCourseContents(courseId: ID!): [Post]
  }

  extend type Querier @key(fields: "id userActionsAsJson") {
    id: ID! @external
    userActionsAsJson: String! @external

    totalPosts: Int
    listPosts(query: String): [Post]

    listCoursePosts(courseId: ID!): [Post]

    totalFreeArticles: Int
    totalFeedback: Int
    totalTags: Int

    getPostById(id: ID!): Post
    listTags(query: String): [Tag]

    listFeedback(query: String): [Feedback]
    getPremiumPost(input: GetPremiumPostInput!): Post
  }

  extend type Mutator @key(fields: "id userActionsAsJson") {
    id: ID! @external
    userActionsAsJson: String! @external
    upsertCourse(input: UpsertCourseInput!): Course
    upsertTag(input: UpsertTagInput!): Tag
    upsertPost(input: UpsertPostInput!): Post
    deletePost(id: ID!): Post

    upsertPostContent(postId: ID!, input: UpsertPostContentInput!): PostContent

    createFeedback(input: FeedbackInput!): Feedback
    updateFeedback(input: FeedbackInput!): Feedback

    deleteCourse(id: ID!): Course
  }
`;

const federatedSchema = buildSubgraphSchema([
  {
    typeDefs: mergeTypeDefs([
      typeDefs,
      POSITIVE_INT_TYPE_DEFINITION,
      COMMON_PAGINATION_INPUT_CONFIG_TYPES,
      COMMON_PAGINATION_TYPES,
      COURSE_TYPES,
      TAG_TYPES,
      POST_TYPES,
      POST_CONTENT_TYPES,
      FEEDBACK_TYPES,
    ]),
    resolvers: mergeResolvers([
      {PositiveInt: PositiveIntResolver},
      CourseResolvers,
      TagResolvers,
      PostResolvers,
      PostContentResolvers,
      FeedbackResolvers,
    ]) as any,
  },
]);

const graphqlSchemaObj = printIntrospectionSchema(federatedSchema);

writeFileSync('./schemas.graphql', graphqlSchemaObj);

// const schema = lowerCaseDirectiveTransformer(federatedSchema, 'lowerCase');

export default federatedSchema;
