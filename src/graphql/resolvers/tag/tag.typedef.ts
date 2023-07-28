import {gql} from 'apollo-server-core';

const TAG_TYPES = gql`
  type Tag {
    id: ID
    name: String
    imgSrc: String
    description: String
    visibility: Boolean
    color: String
    createdAt: Date
    updatedAt: Date
  }
  """
  Filtering configuration by fields.
  """
  input FilterTagInput {
    id: [ID]
    name: String
    description: String
    visibility: Boolean
    createdAt: String
    updatedAt: String
    _or: [FilterTagInput]
    _and: [FilterTagInput]
    _eq: FilterTagInput
    _gt: FilterTagInput
    _gte: FilterTagInput
    _in: [FilterTagInput]
    _lt: FilterTagInput
    _lte: FilterTagInput
    _neq: FilterTagInput
    _nin: [FilterTagInput]
  }

  input SortTagByFieldInput {
    id: SortingEnum
    name: SortingEnum
    description: SortingEnum
    visibility: SortingEnum
    createdAt: SortingEnum
    updatedAt: SortingEnum
  }

  #
  # ################################# Update tag #################################
  #
  input UpsertTagInput {
    id: ID!
    name: String
    imgSrc: String
    description: String
    color: String
    visibility: Boolean
  }
`;

export default TAG_TYPES;
