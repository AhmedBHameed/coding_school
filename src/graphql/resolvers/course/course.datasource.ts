/**
 * To read more about graphql data structure @see https://www.apollographql.com/docs/apollo-server/data/data-sources/
 * Also deep dive of data structure @see https://www.apollographql.com/blog/backend/data-sources/a-deep-dive-on-apollo-data-sources/
 * */

// import DataLoader from 'dataloader'
import {DataSource} from 'apollo-datasource';
import {ApolloError, AuthenticationError} from 'apollo-server-core';
/**
 * @see https://www.npmjs.com/package/@wandererin/odata-v4-mongodb
 */
import {createQuery} from 'odata-v4-mongodb';
import {Course, InputMaybe, UpsertCourseInput} from 'src/graphql/models';
import {callTryCatch} from 'src/util';

import CourseDbModel from '../_database/course.model';
import NotFoundError from '../_errors/NotFoundError.error';

export default class CourseDataSource extends DataSource {
  constructor() {
    super();
    this.listCourses = this.listCourses.bind(this);
    this.upsertCourses = this.upsertCourses.bind(this);
    this.authenticationError = this.authenticationError.bind(this);
    this.getCourse = this.getCourse.bind(this);
    this.unknownError = this.unknownError.bind(this);
  }

  async getCourse(courseId: string) {
    const responseResult = await callTryCatch<Course | null, Error>(async () =>
      CourseDbModel.findOne({
        id: courseId,
      })
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    if (!responseResult)
      throw new NotFoundError(
        "We coudn't find the course you are looking for!"
      );

    return responseResult;
  }

  async countCourses() {
    const result = await callTryCatch<number, Error>(async () =>
      CourseDbModel.countDocuments()
    );

    if (result instanceof Error) {
      throw this.unknownError(result);
    }

    return result;
  }

  // const q = createQuery(decodeURIComponent(query || ''));

  // const result = await callTryCatch<IPostModel[], Error>(async () =>
  //   PostDbModel.find({
  //     visibility: true,
  //     type: PostTypeEnum.Article,
  //     isPremium: false,
  //   })
  //     .sort(q.sort)
  //     .skip(q.skip)
  //     .limit(q.limit)
  // );

  async listCourses(query?: InputMaybe<string>) {
    const q = createQuery(
      query ? decodeURIComponent(query) : '$skip=0&$top=10'
    );

    const responseResult = await callTryCatch<Course[], Error>(async () =>
      CourseDbModel.find(q.query).sort(q.sort).skip(q.skip).limit(q.limit)
    );

    if (responseResult instanceof Error) {
      throw this.unknownError(responseResult);
    }

    return responseResult;
  }

  async upsertCourses(input: UpsertCourseInput) {
    const responseResult = await callTryCatch<Course, Error>(async () =>
      CourseDbModel.findOneAndUpdate(
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

  async deleteCourse(id: string) {
    const responseResult = await callTryCatch<Course | null, Error>(async () =>
      CourseDbModel.findOneAndDelete({id}, {returnOriginal: true})
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
