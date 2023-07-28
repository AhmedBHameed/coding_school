import {gql} from 'apollo-server-core';

const POST_TYPES = gql`
  enum PostTypeEnum {
    COURSE
    ARTICLE
  }

  type Post {
    id: ID
    slug: String
    groupName: String
    nanoId: String
    isPremium: Boolean
    type: PostTypeEnum
    visibility: Boolean
    authorId: String
    author: User
    tagIds: [ID]
    tags: [Tag]
    courseId: ID
    postContentIds: [ID]!
    postContents(lang: LanguageEnum): [PostContent]
    nextPostId: ID
    prevPostId: ID
    accessedByUserIds: [ID]
    createdAt: Date
    updatedAt: Date
  }

  type PostResponse {
    data: [Post]
    totalCount: Int
    page: Pagination
  }

  #
  # ################################# Update Post #################################
  #
  input PostMetaTagsInput {
    injectHeader: String
    injectCssStyle: String
    description: String
  }

  input UpsertPostInput {
    id: ID!
    slug: String
    groupName: String
    nanoId: String
    courseId: ID
    postContentIds: [ID]
    authorId: String
    type: PostTypeEnum
    visibility: Boolean
    tagIds: [ID]
    isPremium: Boolean
    accessedByUserIds: [ID]
    nextPostId: ID
    prevPostId: ID
  }

  input GetPremiumPostInput {
    nanoId: ID!
    slug: String!
    postId: ID
  }
`;

export default POST_TYPES;
