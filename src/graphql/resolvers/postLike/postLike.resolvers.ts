import {Resolvers} from 'src/graphql/models';
import isAuthorizedUser, {
  UserPermission,
} from 'src/services/isAuthorizedUser.service';

const TagResolvers: Resolvers = {
  Querier: {
    totalTags: async (_, __, {dataSources}) => {
      const {countTags} = dataSources.tagDataSource;

      const responseResult = await countTags();
      return responseResult;
    },
    listTags: async (_, {query}, {dataSources}) => {
      const {listTags} = dataSources.tagDataSource;

      const responseResult = await listTags(query);
      return responseResult;
    },
  },
  Mutator: {
    upsertTag: async ({userActionsAsJson}, {input}, {dataSources}) => {
      const {upsertTag} = dataSources.tagDataSource;
      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'tags',
        permission: 'upsert',
      });

      const responseResult = await upsertTag(input);
      return responseResult;
    },
  },
};

export default TagResolvers;
