import {uniq} from 'lodash';
import {Resolvers} from 'src/graphql/models';
import isAuthorizedUser, {
  UserPermission,
} from 'src/services/isAuthorizedUser.service';

const PostContentResolvers: Resolvers = {
  Mutator: {
    upsertPostContent: async (
      {userActionsAsJson},
      {postId, input},
      {dataSources}
    ) => {
      const {
        postContentDataSource: {upsertPostContent},
        postDataSource: {upsertPost, getPost},
      } = dataSources;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'upsert',
      });

      const responseResult = await upsertPostContent(input);
      const post = await getPost({postId});

      if (post) {
        await upsertPost({
          id: postId,
          postContentIds: uniq<string>([
            ...post.postContentIds,
            responseResult.id,
          ]),
        });
      }

      return responseResult;
    },
  },
};

export default PostContentResolvers;
