import {gql} from 'apollo-server-core';

const FEEDBACK_TYPES = gql`
  type Feedback {
    id: ID
    title: String
    message: String
    authorId: ID
    author: User
    resolved: Boolean
    createdAt: Date
    updatedAt: Date
  }

  input FeedbackInput {
    id: ID!
    title: String!
    message: String!
    resolved: Boolean
  }

  """
  Filtering configuration by fields.
  """
  input FeedbackFilterInput {
    id: [ID]
    title: String
    message: String
    authorId: ID
    resolved: Boolean
    createdAt: Date
    updatedAt: Date
    _or: [FeedbackFilterInput]
    _and: [FeedbackFilterInput]
    _eq: FeedbackFilterInput
    _gt: FeedbackFilterInput
    _gte: FeedbackFilterInput
    _in: [FeedbackFilterInput]
    _lt: FeedbackFilterInput
    _lte: FeedbackFilterInput
    _neq: FeedbackFilterInput
    _nin: [FeedbackFilterInput]
  }

  """
  Single sorting configuration by field name and direction. An object of \`key\` \`direction\` properties is required when applying for sorting.
  """
  input PostSortingByFieldInput {
    id: SortingEnum
    title: SortingEnum
    message: SortingEnum
    resolved: SortingEnum
    isPremium: SortingEnum
    createdAt: SortingEnum
    updatedAt: SortingEnum
  }
`;

export default FEEDBACK_TYPES;
