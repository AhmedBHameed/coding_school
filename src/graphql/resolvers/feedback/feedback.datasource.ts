/**
 * To read more about graphql data structure @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * Also deep dive of data structure @see https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
 * */

// import DataLoader from 'dataloader'
import {DataSource} from 'apollo-datasource';
import {ApolloError, AuthenticationError} from 'apollo-server-core';
import {createQuery} from 'odata-v4-mongodb';
import {FeedbackInput, InputMaybe} from 'src/graphql/models';
import {callTryCatch} from 'src/util';

import FeedbackDbModel, {IFeedbackModel} from '../_database/feeback.model';
import NotFoundError from '../_errors/NotFoundError.error';

export default class FeedbackDataSource extends DataSource {
  constructor() {
    super();
    this.createFeedback = this.createFeedback.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.countFeedbacks = this.countFeedbacks.bind(this);
    this.authenticationError = this.authenticationError.bind(this);
    this.unknownError = this.unknownError.bind(this);
  }

  async countFeedbacks() {
    const result = await callTryCatch<number, Error>(async () =>
      FeedbackDbModel.countDocuments()
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result;
  }

  async listFeedback(query?: InputMaybe<string>) {
    const q = createQuery(
      query ? decodeURIComponent(query) : '$skip=0&$top=10'
    );

    const responseResult = await callTryCatch<IFeedbackModel[] | null, Error>(
      async () =>
        FeedbackDbModel.find(q.query).sort(q.sort).skip(q.skip).limit(q.limit)
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async createFeedback(input: FeedbackInput, userId?: string) {
    if (!userId) throw this.authenticationError('You need to login first');

    const responseResult = await callTryCatch<IFeedbackModel, Error>(async () =>
      FeedbackDbModel.create({
        ...input,
        authorId: userId,
      })
    );

    return responseResult;
  }

  async updateFeedback(input: FeedbackInput) {
    const responseResult = await callTryCatch<IFeedbackModel | null, Error>(
      async () =>
        FeedbackDbModel.findOneAndUpdate(
          {id: input.id},
          {
            ...input,
          }
        )
    );

    if (!responseResult)
      throw new NotFoundError(
        "We coudn't find the feedback you want to update!"
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
