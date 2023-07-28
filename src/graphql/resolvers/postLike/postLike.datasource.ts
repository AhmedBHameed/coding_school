/**
 * To read more about graphql data structure @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * Also deep dive of data structure @see https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
 * */

// import DataLoader from 'dataloader'
import {DataSource} from 'apollo-datasource';
import {ApolloError, AuthenticationError} from 'apollo-server-core';
import {createQuery} from 'odata-v4-mongodb';
import {InputMaybe, UpsertTagInput} from 'src/graphql/models';
import {callTryCatch} from 'src/util';

import TagDbModel, {ITagModel} from '../_database/tag.model';

export default class TagDataSource extends DataSource {
  constructor() {
    super();
    this.listTags = this.listTags.bind(this);
    this.upsertTag = this.upsertTag.bind(this);
    this.authenticationError = this.authenticationError.bind(this);
    this.unknownError = this.unknownError.bind(this);
  }

  async countTags() {
    const result = await callTryCatch<number, Error>(async () =>
      TagDbModel.countDocuments()
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result;
  }

  async listTags(query?: InputMaybe<string>) {
    const q = createQuery(
      query ? decodeURIComponent(query) : '$skip=0&$top=10'
    );

    const responseResult = await callTryCatch<ITagModel[], Error>(async () =>
      TagDbModel.find(q.query).sort(q.sort).skip(q.skip).limit(q.limit)
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async upsertTag(input: UpsertTagInput) {
    const responseResult = await callTryCatch<ITagModel, Error>(async () =>
      TagDbModel.findOneAndUpdate(
        {id: input.id},
        {$set: input},
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
