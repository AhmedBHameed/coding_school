/**
 * To read more about graphql data structure @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * Also deep dive of data structure @see https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
 * */

// import DataLoader from 'dataloader'
import {DataSource} from 'apollo-datasource';
import {ApolloError, AuthenticationError} from 'apollo-server-core';
import readingTime from 'reading-time';
import {
  InputMaybe,
  LanguageEnum,
  Maybe,
  UpsertPostContentInput,
} from 'src/graphql/models';
import {callTryCatch} from 'src/util';

import PostContentDbModel, {
  IPostContentModel,
} from '../_database/postContent.model';

export default class PostContentDataSource extends DataSource {
  constructor() {
    super();
    this.listPostContent = this.listPostContent.bind(this);
    this.upsertPostContent = this.upsertPostContent.bind(this);
    this.authenticationError = this.authenticationError.bind(this);
    this.unknownError = this.unknownError.bind(this);
  }

  async listPostContent(
    postContentIds: Maybe<string>[],
    lang?: InputMaybe<LanguageEnum>
  ) {
    const findConfig: any = {
      id: {$in: postContentIds || []},
    };

    if (lang) {
      findConfig.lang = lang;
    }

    const responseResult = await callTryCatch<
      (IPostContentModel & {headLines: string[]})[] | null,
      Error
    >(async () => PostContentDbModel.find(findConfig));

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async upsertPostContent(input: UpsertPostContentInput) {
    const responseResult = await callTryCatch<IPostContentModel, Error>(
      async () =>
        PostContentDbModel.findOneAndUpdate(
          {id: input.id},
          {
            $set: {
              ...input,
              readingTime: readingTime(input.body || '').text,
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
