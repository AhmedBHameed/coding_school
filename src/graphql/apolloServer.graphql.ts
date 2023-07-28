import {ApolloServerPluginLandingPageGraphQLPlayground} from 'apollo-server-core';
import {ApolloServer} from 'apollo-server-express';
import {logger} from 'src/services';
import {counter, histogram} from 'src/services/prometheus.service';

import {IS_PRODUCTION} from '../config/environment';
import monitorPerformance from './plugins/monitorPerformance.plugin';
import {
  CourseDataSource,
  FeedbackDataSource,
  PostContentDataSource,
  PostDataSource,
  TagDataSource,
} from './resolvers';
import schema from './schema.graphql';

const apolloServer = new ApolloServer({
  debug: !IS_PRODUCTION,
  introspection: !IS_PRODUCTION, // Disable Graphql playground on production.
  schema,
  formatError: (graphqlError) => {
    logger.error(graphqlError);
    return graphqlError;
  },
  plugins: [
    monitorPerformance,
    ApolloServerPluginLandingPageGraphQLPlayground(),
  ],
  dataSources: () => ({
    courseDataSource: new CourseDataSource(),
    tagDataSource: new TagDataSource(),
    postDataSource: new PostDataSource(),
    postContentDataSource: new PostContentDataSource(),
    feedbackDataSource: new FeedbackDataSource(),
  }),
  context: async ({req, res}) => ({req, res, histogram, counter}),
});

export default apolloServer;
