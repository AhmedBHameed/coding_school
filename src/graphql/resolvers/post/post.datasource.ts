/**
 * To read more about graphql data structure @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * Also deep dive of data structure @see https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
 * */

// import DataLoader from 'dataloader'
import {DataSource} from 'apollo-datasource';
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-core';
/**
 * @see https://www.npmjs.com/package/@wandererin/odata-v4-mongodb
 */
import {createQuery} from 'odata-v4-mongodb';
import {
  GetPremiumPostInput,
  InputMaybe,
  Post,
  PostTypeEnum,
  UpsertPostInput,
} from 'src/graphql/models';
import {callTryCatch} from 'src/util';

import PostDbModel, {IPostModel} from '../_database/post.model';
import PostContentDbModel from '../_database/postContent.model';

export default class PostDataSource extends DataSource {
  constructor() {
    super();
    // Public
    this.listPublicPosts = this.listPublicPosts.bind(this);
    this.getPublicPost = this.getPublicPost.bind(this);

    // Admin
    this.getPremiumPost = this.getPremiumPost.bind(this);
    this.upsertPost = this.upsertPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.authenticationError = this.authenticationError.bind(this);
    this.unknownError = this.unknownError.bind(this);
    this.listPosts = this.listPosts.bind(this); // {Deprecated}
  }

  // For public pages
  async listPublicPosts(query?: InputMaybe<string>) {
    const q = createQuery(decodeURIComponent(query || ''));

    const result = await callTryCatch<IPostModel[], Error>(async () =>
      PostDbModel.find({
        visibility: true,
        type: PostTypeEnum.Article,
        isPremium: false,
      })
        .sort(q.sort)
        .skip(q.skip)
        .limit(q.limit)
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result as Post[];
  }

  async getPublicPost(input: {nanoId?: string; slug?: string}) {
    const responseResult = await callTryCatch<IPostModel | null, Error>(
      async () =>
        PostDbModel.findOne({
          $or: [
            {
              $and: [{nanoId: input.nanoId}, {slug: input.slug}],
            },
          ],
        })
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  // For admin pages
  async listPosts(query?: InputMaybe<string>) {
    const q = createQuery(
      query ? decodeURIComponent(query) : '$skip=0&$top=10'
    );

    const result = await callTryCatch<IPostModel[], Error>(async () =>
      PostDbModel.find(q.query).sort(q.sort).skip(q.skip).limit(q.limit)
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result as Post[];
  }

  async getPremiumPost(input: GetPremiumPostInput & {userId: string}) {
    const responseResult = await callTryCatch<IPostModel | null, Error>(
      async () =>
        PostDbModel.findOne({
          $or: [
            {
              $and: [
                {nanoId: input.nanoId},
                {slug: input.slug},
                {accessedByUserIds: {$in: input.userId}},
              ],
            },
            {id: input.postId},
          ],
        })
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    if (!responseResult)
      throw new ForbiddenError(
        'Permission denied! It is sad that you are not among premium members'
      );

    return responseResult;
  }

  async listCoursePosts(ids: string[]) {
    if (!ids || !ids.length) return [];

    const aggregateMatcher: any[] = [
      {$match: {id: {$in: ids}, type: PostTypeEnum.Course, visibility: true}},
      {$addFields: {__id: {$indexOfArray: [ids, '$id']}}},
      {$sort: {__id: 1}},
    ];

    const responseResult = await callTryCatch<IPostModel[], Error>(async () =>
      PostDbModel.aggregate<IPostModel>(aggregateMatcher).exec()
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async countPosts() {
    const result = await callTryCatch<number, Error>(async () =>
      PostDbModel.countDocuments()
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result;
  }

  async countFreeArticles() {
    const result = await callTryCatch<number, Error>(async () =>
      PostDbModel.find({
        visibility: true,
        isPremium: false,
        type: PostTypeEnum.Article,
      }).countDocuments()
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result;
  }

  /**
   * {Deprecated}
   * @param input
   * @returns
   */
  // TODO: Think about that part from access perspective.
  async getPost(input: {nanoId?: string; slug?: string; postId?: string}) {
    const responseResult = await callTryCatch<IPostModel | null, Error>(
      async () =>
        PostDbModel.findOne({
          $or: [
            {
              $and: [{nanoId: input.nanoId}, {slug: input.slug}],
            },
            {id: input.postId},
          ],
        }).exec()
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async upsertPost(input: UpsertPostInput) {
    const responseResult = await callTryCatch<IPostModel, Error>(async () =>
      PostDbModel.findOneAndUpdate(
        {id: input.id},
        {
          $set: {
            ...input,
            tagIds: [...new Set(input?.tagIds || [])],
          },
        },
        {upsert: true, new: true}
      )
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async deletePost(id: string) {
    const responseResult = await callTryCatch<IPostModel | null, Error>(
      async () => PostDbModel.findOneAndDelete({id}, {returnOriginal: true})
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    if (responseResult?.postContentIds?.length) {
      await callTryCatch<void, Error>(async () => {
        await PostContentDbModel.deleteMany({
          id: {
            $in: responseResult.postContentIds,
          },
        });
      });
    }

    return responseResult;
  }

  // Errors
  authenticationError(responseResult?: any) {
    return new AuthenticationError('Unauthenticated call', responseResult);
  }

  unknownError(responseResult?: any) {
    return new ApolloError(
      responseResult.message,
      'INTERNAL_SERVER_ERROR',
      responseResult
    );
  }
}
