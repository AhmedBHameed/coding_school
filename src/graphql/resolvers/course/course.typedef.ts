import {gql} from 'apollo-server-core';

const COURSE_TYPES = gql`
  type Course {
    id: ID
    slug: String
    description: String
    nanoId: String
    image: String
    lang: LanguageEnum
    authorId: String
    author: User
    tagIds: [ID]
    tags: [Tag]
    visibility: Boolean
    publishedAt: Date
    isPremium: Boolean
    postIds: [ID]!
    courseId: ID
    createdAt: Date
    updatedAt: Date
  }
  """
  Filtering configuration by fields.
  """
  input CourseFilterInput {
    id: ID
    lang: LanguageEnum
    slug: String
    authorId: ID
    visibility: Boolean
    isPremium: Boolean
    createdAt: String
    updatedAt: String
    _or: [CourseFilterInput]
    _and: [CourseFilterInput]
    _eq: CourseFilterInput
    _gt: CourseFilterInput
    _gte: CourseFilterInput
    _in: [CourseFilterInput]
    _lt: CourseFilterInput
    _lte: CourseFilterInput
    _neq: CourseFilterInput
    _nin: [CourseFilterInput]
  }

  """
  Single sorting configuration by field name and direction. An object of \`key\` \`direction\` properties is required when applying for sorting.
  """
  input CourseSortingByFieldInput {
    id: SortingEnum
    slug: SortingEnum
    lang: SortingEnum
    visibility: SortingEnum
    publishedAt: SortingEnum
    isPremium: SortingEnum
    createdAt: SortingEnum
    updatedAt: SortingEnum
  }

  #
  # ################################# Update course #################################
  #
  input UpsertCourseInput {
    id: ID!
    slug: String
    description: String
    nanoId: String
    image: String
    lang: LanguageEnum
    authorId: String
    tagIds: [ID]
    visibility: Boolean
    publishedAt: Date
    isPremium: Boolean
    postIds: [ID]
  }

  input CourseContentsInput {
    slug: String!
    courseId: String!
  }
`;

export default COURSE_TYPES;
