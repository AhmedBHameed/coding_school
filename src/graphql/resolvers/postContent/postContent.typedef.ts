import {gql} from 'apollo-server-core';

const POST_CONTENT_TYPES = gql`
  type PostMetaTags {
    injectHeader: String
    injectCssStyle: String
    description: String
  }

  type PostContent {
    id: ID
    postImage: String
    lang: LanguageEnum
    body: String
    headLines: [String]
    contentPreview: String
    readingTime: String
    metaTags: PostMetaTags
    publishedAt: Date
    createdAt: Date
    updatedAt: Date
  }

  input PostMetaTagsInput {
    injectHeader: String
    injectCssStyle: String
    description: String
  }

  input PostContentInput {
    id: ID
    postImage: String
    lang: LanguageEnum
    body: String
    contentPreview: String
    readingTime: String
    metaTags: PostMetaTagsInput
    publishedAt: Date
  }

  #
  # ################################# Upsert post content #################################
  #
  input UpsertPostContentInput {
    id: ID
    postImage: String
    lang: LanguageEnum
    body: String
    contentPreview: String
    readingTime: String
    metaTags: PostMetaTagsInput
    publishedAt: Date
  }
`;

export default POST_CONTENT_TYPES;
