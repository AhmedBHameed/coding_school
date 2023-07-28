import {Resolvers} from 'src/graphql/models';
import isAuthorizedUser, {
  UserPermission,
} from 'src/services/isAuthorizedUser.service';

const PostResolvers: Resolvers = {
  Post: {
    author: (post) => ({__typename: 'User', id: post.authorId} as any),
    tags: async (parent, _, {dataSources}) => {
      const {listTags} = dataSources.tagDataSource;

      const tagIdsQuery = (parent.tagIds || [])
        .map((id) => `id eq '${id}'`)
        .join(' or ');

      const responseResult = await listTags(
        encodeURIComponent(
          `$filter=${
            tagIdsQuery ? `${tagIdsQuery} and ` : ''
          }visibility eq true`
        )
      );
      return responseResult;
    },
    postContents: async (parent, {lang}, {dataSources}) => {
      const {listPostContent} = dataSources.postContentDataSource;
      const responseResult = await listPostContent(parent.postContentIds, lang);

      if (responseResult?.length)
        responseResult.forEach((postContent) => {
          postContent.headLines = [
            ...((postContent.body?.match(/^(#{1,6})\s(.*)$/gm) as string[]) ||
              []),
          ];
        });

      return responseResult;
    },
  },
  Querier: {
    listPosts: async ({userActionsAsJson}, {query}, {dataSources}) => {
      const {listPosts} = dataSources.postDataSource;
      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'read',
      });
      const responseResult = await listPosts(query);
      return responseResult;
    },
    getPostById: async ({userActionsAsJson}, {id}, {dataSources}) => {
      const {
        postDataSource: {getPost},
      } = dataSources;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'read',
      });

      const result = await getPost({postId: id});

      return result;
    },

    listCoursePosts: async ({userActionsAsJson}, {courseId}, {dataSources}) => {
      const {
        postDataSource: {listCoursePosts},
        courseDataSource: {getCourse},
      } = dataSources;
      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'read',
      });

      const course = await getCourse(courseId);
      const responseResult = await listCoursePosts(
        (course.postIds as string[]) || []
      );

      return responseResult;
    },

    totalPosts: async (_, __, {dataSources}) => {
      const {countPosts} = dataSources.postDataSource;

      const responseResult = await countPosts();
      return responseResult;
    },
    getPremiumPost: async ({id: userId}, {input}, {dataSources}) => {
      const {getPremiumPost} = dataSources.postDataSource;
      // isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
      //   modelName: 'posts',
      //   permission: 'read',
      // });
      const responseResult = await getPremiumPost({...input, userId});
      return responseResult;
    },
  },
  Mutator: {
    upsertPost: async ({userActionsAsJson}, {input}, {dataSources}) => {
      const {upsertPost} = dataSources.postDataSource;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'upsert',
      });

      const responseResult = await upsertPost(input);
      return responseResult;
    },
    deletePost: async ({userActionsAsJson}, {id}, {dataSources}) => {
      const {deletePost} = dataSources.postDataSource;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'posts',
        permission: 'delete',
      });

      const responseResult = await deletePost(id);
      return responseResult;
    },
  },

  Query: {
    totalFreeArticles: async (_, __, {dataSources}) => {
      const {countFreeArticles} = dataSources.postDataSource;

      const responseResult = await countFreeArticles();
      return responseResult;
    },
    totalPosts: async (_, __, {dataSources}) => {
      const {countPosts} = dataSources.postDataSource;

      const responseResult = await countPosts();
      return responseResult;
    },
    getPublicPost: async (_, input, {dataSources}) => {
      const {getPublicPost} = dataSources.postDataSource;

      const responseResult = await getPublicPost(input);
      return responseResult;
    },
    listPublicPosts: async (_, {query}, {dataSources}) => {
      const {listPublicPosts} = dataSources.postDataSource;

      const responseResult = await listPublicPosts(query);
      return responseResult;
    },
    // // Deprecated
    // getPost: async (_, input, {dataSources}) => {
    //   const {getPost} = dataSources.postDataSource;

    //   const responseResult = await getPost(input);
    //   return responseResult;
    // },
    // // Deprecated
    // listPosts: async (_, {input}, {dataSources}) => {
    //   const {listPosts} = dataSources.postDataSource;

    //   const responseResult = await listPosts(input);
    //   return responseResult;
    // },
  },
};

export default PostResolvers;
