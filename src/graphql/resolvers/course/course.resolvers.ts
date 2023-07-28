import {Resolvers} from 'src/graphql/models';
import isAuthorizedUser, {
  UserPermission,
} from 'src/services/isAuthorizedUser.service';

const CourseResolvers: Resolvers = {
  Course: {
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
  },
  Mutator: {
    upsertCourse: async ({userActionsAsJson}, {input}, {dataSources}) => {
      const {upsertCourses} = dataSources.courseDataSource;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'courses',
        permission: 'upsert',
      });

      const responseResult = await upsertCourses(input);
      return responseResult;
    },
    deleteCourse: async ({userActionsAsJson}, {id}, {dataSources}) => {
      const {deleteCourse} = dataSources.courseDataSource;

      isAuthorizedUser(JSON.parse(userActionsAsJson) as UserPermission[], {
        modelName: 'courses',
        permission: 'delete',
      });

      const responseResult = await deleteCourse(id);
      return responseResult;
    },
  },
  Query: {
    getCourse: async (_, {courseId}, {dataSources}) => {
      const {getCourse} = dataSources.courseDataSource;

      const responseResult = await getCourse(courseId);
      return responseResult;
    },
    totalCourses: async (__typename, __, {dataSources}) => {
      const {countCourses} = dataSources.courseDataSource;

      const responseResult = await countCourses();
      return responseResult;
    },
    listCourses: async (_, {query}, {dataSources}) => {
      const {listCourses} = dataSources.courseDataSource;

      const responseResult = await listCourses(query);

      return responseResult;
    },
    getCourseContents: async (_, {courseId}, {dataSources}) => {
      const {
        courseDataSource: {getCourse},
        postDataSource: {listCoursePosts},
      } = dataSources;

      const course = await getCourse(courseId);

      const posts = await listCoursePosts(course.postIds as string[]);

      return posts;
    },
  },
};

export default CourseResolvers;
