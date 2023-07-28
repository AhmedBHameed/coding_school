import {Resolvers} from 'src/graphql/models';
import isAuthorizedUser, {
  UserPermission,
} from 'src/services/isAuthorizedUser.service';

const FeedbackContentResolvers: Resolvers = {
  Feedback: {
    author: (feedback) => ({__typename: 'User', id: feedback.authorId} as any),
  },
  Querier: {
    totalFeedback: async (_, __, {dataSources}) => {
      const {countFeedbacks} = dataSources.feedbackDataSource;

      const result = await countFeedbacks();

      return result;
    },
    listFeedback: async ({userActionsAsJson}, {query}, {dataSources}) => {
      const {listFeedback} = dataSources.feedbackDataSource;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'feedbacks',
        permission: 'list',
      });

      const responseResult = await listFeedback(query);

      return responseResult;
    },
  },

  Mutator: {
    createFeedback: async ({id: userId}, {input}, {dataSources}) => {
      const {createFeedback} = dataSources.feedbackDataSource;

      const responseResult = await createFeedback(input, userId);

      return responseResult;
    },
    updateFeedback: async (__, {input}, {dataSources}) => {
      const {updateFeedback} = dataSources.feedbackDataSource;

      const responseResult = await updateFeedback(input);

      return responseResult;
    },
  },
};

export default FeedbackContentResolvers;
