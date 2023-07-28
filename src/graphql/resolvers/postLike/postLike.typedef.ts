import {gql} from 'apollo-server-core';

const POST_LIKE_TYPES = gql`
  input PostLikeInput {
    postContentId: ID!
    userId: ID!
  }
`;

export default POST_LIKE_TYPES;
