import {Request, Response} from 'express';
import {Counter, Histogram} from 'prom-client';

import {
  CourseDataSource,
  FeedbackDataSource,
  PostContentDataSource,
  PostDataSource,
  TagDataSource,
} from '../resolvers';

export type Context = {
  req: Request;
  res: Response;
  dataSources: {
    courseDataSource: CourseDataSource;
    tagDataSource: TagDataSource;
    postDataSource: PostDataSource;
    postContentDataSource: PostContentDataSource;
    feedbackDataSource: FeedbackDataSource;
  };
  histogram: Histogram<string>;
  counter: Counter<string>;
};
