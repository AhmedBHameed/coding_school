import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';
import {Context} from './context.model';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {[key: string]: unknown}> = {[K in keyof T]: T[K]};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  PositiveInt: any;
  _Any: any;
};

export type Course = {
  __typename?: 'Course';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']>;
  courseId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  image?: Maybe<Scalars['String']>;
  isPremium?: Maybe<Scalars['Boolean']>;
  lang?: Maybe<LanguageEnum>;
  nanoId?: Maybe<Scalars['String']>;
  postIds: Array<Maybe<Scalars['ID']>>;
  publishedAt?: Maybe<Scalars['Date']>;
  slug?: Maybe<Scalars['String']>;
  tagIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  updatedAt?: Maybe<Scalars['Date']>;
  visibility?: Maybe<Scalars['Boolean']>;
};

export type CourseContentsInput = {
  courseId: Scalars['String'];
  slug: Scalars['String'];
};

/** Filtering configuration by fields. */
export type CourseFilterInput = {
  _and?: InputMaybe<Array<InputMaybe<CourseFilterInput>>>;
  _eq?: InputMaybe<CourseFilterInput>;
  _gt?: InputMaybe<CourseFilterInput>;
  _gte?: InputMaybe<CourseFilterInput>;
  _in?: InputMaybe<Array<InputMaybe<CourseFilterInput>>>;
  _lt?: InputMaybe<CourseFilterInput>;
  _lte?: InputMaybe<CourseFilterInput>;
  _neq?: InputMaybe<CourseFilterInput>;
  _nin?: InputMaybe<Array<InputMaybe<CourseFilterInput>>>;
  _or?: InputMaybe<Array<InputMaybe<CourseFilterInput>>>;
  authorId?: InputMaybe<Scalars['ID']>;
  createdAt?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isPremium?: InputMaybe<Scalars['Boolean']>;
  lang?: InputMaybe<LanguageEnum>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['Boolean']>;
};

/** Single sorting configuration by field name and direction. An object of `key` `direction` properties is required when applying for sorting. */
export type CourseSortingByFieldInput = {
  createdAt?: InputMaybe<SortingEnum>;
  id?: InputMaybe<SortingEnum>;
  isPremium?: InputMaybe<SortingEnum>;
  lang?: InputMaybe<SortingEnum>;
  publishedAt?: InputMaybe<SortingEnum>;
  slug?: InputMaybe<SortingEnum>;
  updatedAt?: InputMaybe<SortingEnum>;
  visibility?: InputMaybe<SortingEnum>;
};

export type Feedback = {
  __typename?: 'Feedback';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  id?: Maybe<Scalars['ID']>;
  message?: Maybe<Scalars['String']>;
  resolved?: Maybe<Scalars['Boolean']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

/** Filtering configuration by fields. */
export type FeedbackFilterInput = {
  _and?: InputMaybe<Array<InputMaybe<FeedbackFilterInput>>>;
  _eq?: InputMaybe<FeedbackFilterInput>;
  _gt?: InputMaybe<FeedbackFilterInput>;
  _gte?: InputMaybe<FeedbackFilterInput>;
  _in?: InputMaybe<Array<InputMaybe<FeedbackFilterInput>>>;
  _lt?: InputMaybe<FeedbackFilterInput>;
  _lte?: InputMaybe<FeedbackFilterInput>;
  _neq?: InputMaybe<FeedbackFilterInput>;
  _nin?: InputMaybe<Array<InputMaybe<FeedbackFilterInput>>>;
  _or?: InputMaybe<Array<InputMaybe<FeedbackFilterInput>>>;
  authorId?: InputMaybe<Scalars['ID']>;
  createdAt?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  message?: InputMaybe<Scalars['String']>;
  resolved?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Date']>;
};

export type FeedbackInput = {
  id: Scalars['ID'];
  message: Scalars['String'];
  resolved?: InputMaybe<Scalars['Boolean']>;
  title: Scalars['String'];
};

/** Filtering configuration by fields. */
export type FilterTagInput = {
  _and?: InputMaybe<Array<InputMaybe<FilterTagInput>>>;
  _eq?: InputMaybe<FilterTagInput>;
  _gt?: InputMaybe<FilterTagInput>;
  _gte?: InputMaybe<FilterTagInput>;
  _in?: InputMaybe<Array<InputMaybe<FilterTagInput>>>;
  _lt?: InputMaybe<FilterTagInput>;
  _lte?: InputMaybe<FilterTagInput>;
  _neq?: InputMaybe<FilterTagInput>;
  _nin?: InputMaybe<Array<InputMaybe<FilterTagInput>>>;
  _or?: InputMaybe<Array<InputMaybe<FilterTagInput>>>;
  createdAt?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['Boolean']>;
};

export type GetPremiumPostInput = {
  nanoId: Scalars['ID'];
  postId?: InputMaybe<Scalars['ID']>;
  slug: Scalars['String'];
};

export enum LanguageEnum {
  Ar = 'ar',
  En = 'en',
}

export type Mutator = {
  __typename?: 'Mutator';
  createFeedback?: Maybe<Feedback>;
  deleteCourse?: Maybe<Course>;
  deletePost?: Maybe<Post>;
  id: Scalars['ID'];
  updateFeedback?: Maybe<Feedback>;
  upsertCourse?: Maybe<Course>;
  upsertPost?: Maybe<Post>;
  upsertPostContent?: Maybe<PostContent>;
  upsertTag?: Maybe<Tag>;
  userActionsAsJson: Scalars['String'];
};

export type MutatorCreateFeedbackArgs = {
  input: FeedbackInput;
};

export type MutatorDeleteCourseArgs = {
  id: Scalars['ID'];
};

export type MutatorDeletePostArgs = {
  id: Scalars['ID'];
};

export type MutatorUpdateFeedbackArgs = {
  input: FeedbackInput;
};

export type MutatorUpsertCourseArgs = {
  input: UpsertCourseInput;
};

export type MutatorUpsertPostArgs = {
  input: UpsertPostInput;
};

export type MutatorUpsertPostContentArgs = {
  input: UpsertPostContentInput;
  postId: Scalars['ID'];
};

export type MutatorUpsertTagArgs = {
  input: UpsertTagInput;
};

/** Pagination data model */
export type Pagination = {
  __typename?: 'Pagination';
  number?: Maybe<Scalars['PositiveInt']>;
  size?: Maybe<Scalars['PositiveInt']>;
};

/**
 * Pagination input config. An object of `page`, `size` properties is required to apply pagination.
 *
 * Minimum number for `page` is 1.
 *
 * Min number for `size` is 10.
 *
 * Max number for `size` is 50.
 */
export type PaginationInput = {
  number: Scalars['PositiveInt'];
  size: Scalars['PositiveInt'];
};

export type Post = {
  __typename?: 'Post';
  accessedByUserIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['String']>;
  courseId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['Date']>;
  groupName?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  isPremium?: Maybe<Scalars['Boolean']>;
  nanoId?: Maybe<Scalars['String']>;
  nextPostId?: Maybe<Scalars['ID']>;
  postContentIds: Array<Maybe<Scalars['ID']>>;
  postContents?: Maybe<Array<Maybe<PostContent>>>;
  prevPostId?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
  tagIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  type?: Maybe<PostTypeEnum>;
  updatedAt?: Maybe<Scalars['Date']>;
  visibility?: Maybe<Scalars['Boolean']>;
};

export type PostPostContentsArgs = {
  lang?: InputMaybe<LanguageEnum>;
};

export type PostContent = {
  __typename?: 'PostContent';
  body?: Maybe<Scalars['String']>;
  contentPreview?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  headLines?: Maybe<Array<Maybe<Scalars['String']>>>;
  id?: Maybe<Scalars['ID']>;
  lang?: Maybe<LanguageEnum>;
  metaTags?: Maybe<PostMetaTags>;
  postImage?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['Date']>;
  readingTime?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
};

export type PostContentInput = {
  body?: InputMaybe<Scalars['String']>;
  contentPreview?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lang?: InputMaybe<LanguageEnum>;
  metaTags?: InputMaybe<PostMetaTagsInput>;
  postImage?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['Date']>;
  readingTime?: InputMaybe<Scalars['String']>;
};

export type PostMetaTags = {
  __typename?: 'PostMetaTags';
  description?: Maybe<Scalars['String']>;
  injectCssStyle?: Maybe<Scalars['String']>;
  injectHeader?: Maybe<Scalars['String']>;
};

export type PostMetaTagsInput = {
  description?: InputMaybe<Scalars['String']>;
  injectCssStyle?: InputMaybe<Scalars['String']>;
  injectHeader?: InputMaybe<Scalars['String']>;
};

export type PostResponse = {
  __typename?: 'PostResponse';
  data?: Maybe<Array<Maybe<Post>>>;
  page?: Maybe<Pagination>;
  totalCount?: Maybe<Scalars['Int']>;
};

/** Single sorting configuration by field name and direction. An object of `key` `direction` properties is required when applying for sorting. */
export type PostSortingByFieldInput = {
  createdAt?: InputMaybe<SortingEnum>;
  id?: InputMaybe<SortingEnum>;
  isPremium?: InputMaybe<SortingEnum>;
  message?: InputMaybe<SortingEnum>;
  resolved?: InputMaybe<SortingEnum>;
  title?: InputMaybe<SortingEnum>;
  updatedAt?: InputMaybe<SortingEnum>;
};

export enum PostTypeEnum {
  Article = 'ARTICLE',
  Course = 'COURSE',
}

export type Querier = {
  __typename?: 'Querier';
  getPostById?: Maybe<Post>;
  getPremiumPost?: Maybe<Post>;
  id: Scalars['ID'];
  listCoursePosts?: Maybe<Array<Maybe<Post>>>;
  listFeedback?: Maybe<Array<Maybe<Feedback>>>;
  listPosts?: Maybe<Array<Maybe<Post>>>;
  listTags?: Maybe<Array<Maybe<Tag>>>;
  totalFeedback?: Maybe<Scalars['Int']>;
  totalFreeArticles?: Maybe<Scalars['Int']>;
  totalPosts?: Maybe<Scalars['Int']>;
  totalTags?: Maybe<Scalars['Int']>;
  userActionsAsJson: Scalars['String'];
};

export type QuerierGetPostByIdArgs = {
  id: Scalars['ID'];
};

export type QuerierGetPremiumPostArgs = {
  input: GetPremiumPostInput;
};

export type QuerierListCoursePostsArgs = {
  courseId: Scalars['ID'];
};

export type QuerierListFeedbackArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type QuerierListPostsArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type QuerierListTagsArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _entities: Array<Maybe<_Entity>>;
  _service: _Service;
  getCourse?: Maybe<Course>;
  getCourseContents?: Maybe<Array<Maybe<Post>>>;
  getPublicPost?: Maybe<Post>;
  listCourses?: Maybe<Array<Maybe<Course>>>;
  listPublicPosts?: Maybe<Array<Maybe<Post>>>;
  totalCourses?: Maybe<Scalars['Int']>;
  totalFreeArticles?: Maybe<Scalars['Int']>;
  totalPosts?: Maybe<Scalars['Int']>;
};

export type Query_EntitiesArgs = {
  representations: Array<Scalars['_Any']>;
};

export type QueryGetCourseArgs = {
  courseId: Scalars['String'];
};

export type QueryGetCourseContentsArgs = {
  courseId: Scalars['ID'];
};

export type QueryGetPublicPostArgs = {
  nanoId: Scalars['ID'];
  slug: Scalars['String'];
};

export type QueryListCoursesArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type QueryListPublicPostsArgs = {
  query?: InputMaybe<Scalars['String']>;
};

export type SortTagByFieldInput = {
  createdAt?: InputMaybe<SortingEnum>;
  description?: InputMaybe<SortingEnum>;
  id?: InputMaybe<SortingEnum>;
  name?: InputMaybe<SortingEnum>;
  updatedAt?: InputMaybe<SortingEnum>;
  visibility?: InputMaybe<SortingEnum>;
};

export enum SortingEnum {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type Tag = {
  __typename?: 'Tag';
  color?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  imgSrc?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['Date']>;
  visibility?: Maybe<Scalars['Boolean']>;
};

export type UpsertCourseInput = {
  authorId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: InputMaybe<Scalars['String']>;
  isPremium?: InputMaybe<Scalars['Boolean']>;
  lang?: InputMaybe<LanguageEnum>;
  nanoId?: InputMaybe<Scalars['String']>;
  postIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  publishedAt?: InputMaybe<Scalars['Date']>;
  slug?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  visibility?: InputMaybe<Scalars['Boolean']>;
};

export type UpsertPostContentInput = {
  body?: InputMaybe<Scalars['String']>;
  contentPreview?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  lang?: InputMaybe<LanguageEnum>;
  metaTags?: InputMaybe<PostMetaTagsInput>;
  postImage?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['Date']>;
  readingTime?: InputMaybe<Scalars['String']>;
};

export type UpsertPostInput = {
  accessedByUserIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  authorId?: InputMaybe<Scalars['String']>;
  courseId?: InputMaybe<Scalars['ID']>;
  groupName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  isPremium?: InputMaybe<Scalars['Boolean']>;
  nanoId?: InputMaybe<Scalars['String']>;
  nextPostId?: InputMaybe<Scalars['ID']>;
  postContentIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  prevPostId?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
  tagIds?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  type?: InputMaybe<PostTypeEnum>;
  visibility?: InputMaybe<Scalars['Boolean']>;
};

export type UpsertTagInput = {
  color?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  imgSrc?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
};

export type _Entity = Mutator | Querier | User;

export type _Service = {
  __typename?: '_Service';
  /** The sdl representing the federated service capabilities. Includes federation directives, removes federation types, and includes rest of full schema after schema directives have been applied */
  sdl?: Maybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    {[key in TKey]: TResult},
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    {[key in TKey]: TResult},
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Course: ResolverTypeWrapper<Course>;
  CourseContentsInput: CourseContentsInput;
  CourseFilterInput: CourseFilterInput;
  CourseSortingByFieldInput: CourseSortingByFieldInput;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Feedback: ResolverTypeWrapper<Feedback>;
  FeedbackFilterInput: FeedbackFilterInput;
  FeedbackInput: FeedbackInput;
  FilterTagInput: FilterTagInput;
  GetPremiumPostInput: GetPremiumPostInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LanguageEnum: LanguageEnum;
  Mutator: ResolverTypeWrapper<Mutator>;
  Pagination: ResolverTypeWrapper<Pagination>;
  PaginationInput: PaginationInput;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']>;
  Post: ResolverTypeWrapper<Post>;
  PostContent: ResolverTypeWrapper<PostContent>;
  PostContentInput: PostContentInput;
  PostMetaTags: ResolverTypeWrapper<PostMetaTags>;
  PostMetaTagsInput: PostMetaTagsInput;
  PostResponse: ResolverTypeWrapper<PostResponse>;
  PostSortingByFieldInput: PostSortingByFieldInput;
  PostTypeEnum: PostTypeEnum;
  Querier: ResolverTypeWrapper<Querier>;
  Query: ResolverTypeWrapper<{}>;
  SortTagByFieldInput: SortTagByFieldInput;
  SortingEnum: SortingEnum;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  UpsertCourseInput: UpsertCourseInput;
  UpsertPostContentInput: UpsertPostContentInput;
  UpsertPostInput: UpsertPostInput;
  UpsertTagInput: UpsertTagInput;
  User: ResolverTypeWrapper<User>;
  _Any: ResolverTypeWrapper<Scalars['_Any']>;
  _Entity:
    | ResolversTypes['Mutator']
    | ResolversTypes['Querier']
    | ResolversTypes['User'];
  _Service: ResolverTypeWrapper<_Service>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  Course: Course;
  CourseContentsInput: CourseContentsInput;
  CourseFilterInput: CourseFilterInput;
  CourseSortingByFieldInput: CourseSortingByFieldInput;
  Date: Scalars['Date'];
  Feedback: Feedback;
  FeedbackFilterInput: FeedbackFilterInput;
  FeedbackInput: FeedbackInput;
  FilterTagInput: FilterTagInput;
  GetPremiumPostInput: GetPremiumPostInput;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutator: Mutator;
  Pagination: Pagination;
  PaginationInput: PaginationInput;
  PositiveInt: Scalars['PositiveInt'];
  Post: Post;
  PostContent: PostContent;
  PostContentInput: PostContentInput;
  PostMetaTags: PostMetaTags;
  PostMetaTagsInput: PostMetaTagsInput;
  PostResponse: PostResponse;
  PostSortingByFieldInput: PostSortingByFieldInput;
  Querier: Querier;
  Query: {};
  SortTagByFieldInput: SortTagByFieldInput;
  String: Scalars['String'];
  Tag: Tag;
  UpsertCourseInput: UpsertCourseInput;
  UpsertPostContentInput: UpsertPostContentInput;
  UpsertPostInput: UpsertPostInput;
  UpsertTagInput: UpsertTagInput;
  User: User;
  _Any: Scalars['_Any'];
  _Entity:
    | ResolversParentTypes['Mutator']
    | ResolversParentTypes['Querier']
    | ResolversParentTypes['User'];
  _Service: _Service;
}>;

export type ExtendsDirectiveArgs = {};

export type ExtendsDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ExtendsDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ExternalDirectiveArgs = {};

export type ExternalDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ExternalDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type KeyDirectiveArgs = {
  fields: Scalars['String'];
};

export type KeyDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = KeyDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ProvidesDirectiveArgs = {
  fields: Scalars['String'];
};

export type ProvidesDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = ProvidesDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type RequiresDirectiveArgs = {
  fields: Scalars['String'];
};

export type RequiresDirectiveResolver<
  Result,
  Parent,
  ContextType = Context,
  Args = RequiresDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CourseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']
> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isPremium?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  lang?: Resolver<
    Maybe<ResolversTypes['LanguageEnum']>,
    ParentType,
    ContextType
  >;
  nanoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postIds?: Resolver<
    Array<Maybe<ResolversTypes['ID']>>,
    ParentType,
    ContextType
  >;
  publishedAt?: Resolver<
    Maybe<ResolversTypes['Date']>,
    ParentType,
    ContextType
  >;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ID']>>>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Tag']>>>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  visibility?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type FeedbackResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Feedback'] = ResolversParentTypes['Feedback']
> = ResolversObject<{
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolved?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutatorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutator'] = ResolversParentTypes['Mutator']
> = ResolversObject<{
  createFeedback?: Resolver<
    Maybe<ResolversTypes['Feedback']>,
    ParentType,
    ContextType,
    RequireFields<MutatorCreateFeedbackArgs, 'input'>
  >;
  deleteCourse?: Resolver<
    Maybe<ResolversTypes['Course']>,
    ParentType,
    ContextType,
    RequireFields<MutatorDeleteCourseArgs, 'id'>
  >;
  deletePost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutatorDeletePostArgs, 'id'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updateFeedback?: Resolver<
    Maybe<ResolversTypes['Feedback']>,
    ParentType,
    ContextType,
    RequireFields<MutatorUpdateFeedbackArgs, 'input'>
  >;
  upsertCourse?: Resolver<
    Maybe<ResolversTypes['Course']>,
    ParentType,
    ContextType,
    RequireFields<MutatorUpsertCourseArgs, 'input'>
  >;
  upsertPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<MutatorUpsertPostArgs, 'input'>
  >;
  upsertPostContent?: Resolver<
    Maybe<ResolversTypes['PostContent']>,
    ParentType,
    ContextType,
    RequireFields<MutatorUpsertPostContentArgs, 'input' | 'postId'>
  >;
  upsertTag?: Resolver<
    Maybe<ResolversTypes['Tag']>,
    ParentType,
    ContextType,
    RequireFields<MutatorUpsertTagArgs, 'input'>
  >;
  userActionsAsJson?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PaginationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']
> = ResolversObject<{
  number?: Resolver<
    Maybe<ResolversTypes['PositiveInt']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<
    Maybe<ResolversTypes['PositiveInt']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface PositiveIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type PostResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = ResolversObject<{
  accessedByUserIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ID']>>>,
    ParentType,
    ContextType
  >;
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  authorId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  groupName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  isPremium?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  nanoId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nextPostId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  postContentIds?: Resolver<
    Array<Maybe<ResolversTypes['ID']>>,
    ParentType,
    ContextType
  >;
  postContents?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PostContent']>>>,
    ParentType,
    ContextType,
    Partial<PostPostContentsArgs>
  >;
  prevPostId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tagIds?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ID']>>>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Tag']>>>,
    ParentType,
    ContextType
  >;
  type?: Resolver<
    Maybe<ResolversTypes['PostTypeEnum']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  visibility?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostContentResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostContent'] = ResolversParentTypes['PostContent']
> = ResolversObject<{
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  contentPreview?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  headLines?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  lang?: Resolver<
    Maybe<ResolversTypes['LanguageEnum']>,
    ParentType,
    ContextType
  >;
  metaTags?: Resolver<
    Maybe<ResolversTypes['PostMetaTags']>,
    ParentType,
    ContextType
  >;
  postImage?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  publishedAt?: Resolver<
    Maybe<ResolversTypes['Date']>,
    ParentType,
    ContextType
  >;
  readingTime?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostMetaTagsResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostMetaTags'] = ResolversParentTypes['PostMetaTags']
> = ResolversObject<{
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  injectCssStyle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  injectHeader?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PostResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PostResponse'] = ResolversParentTypes['PostResponse']
> = ResolversObject<{
  data?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType
  >;
  page?: Resolver<Maybe<ResolversTypes['Pagination']>, ParentType, ContextType>;
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QuerierResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Querier'] = ResolversParentTypes['Querier']
> = ResolversObject<{
  getPostById?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QuerierGetPostByIdArgs, 'id'>
  >;
  getPremiumPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QuerierGetPremiumPostArgs, 'input'>
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  listCoursePosts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType,
    RequireFields<QuerierListCoursePostsArgs, 'courseId'>
  >;
  listFeedback?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Feedback']>>>,
    ParentType,
    ContextType,
    Partial<QuerierListFeedbackArgs>
  >;
  listPosts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType,
    Partial<QuerierListPostsArgs>
  >;
  listTags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Tag']>>>,
    ParentType,
    ContextType,
    Partial<QuerierListTagsArgs>
  >;
  totalFeedback?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  totalFreeArticles?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  totalPosts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalTags?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  userActionsAsJson?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = ResolversObject<{
  _entities?: Resolver<
    Array<Maybe<ResolversTypes['_Entity']>>,
    ParentType,
    ContextType,
    RequireFields<Query_EntitiesArgs, 'representations'>
  >;
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>;
  getCourse?: Resolver<
    Maybe<ResolversTypes['Course']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCourseArgs, 'courseId'>
  >;
  getCourseContents?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType,
    RequireFields<QueryGetCourseContentsArgs, 'courseId'>
  >;
  getPublicPost?: Resolver<
    Maybe<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetPublicPostArgs, 'nanoId' | 'slug'>
  >;
  listCourses?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Course']>>>,
    ParentType,
    ContextType,
    Partial<QueryListCoursesArgs>
  >;
  listPublicPosts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Post']>>>,
    ParentType,
    ContextType,
    Partial<QueryListPublicPostsArgs>
  >;
  totalCourses?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  totalFreeArticles?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  totalPosts?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
}>;

export type TagResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']
> = ResolversObject<{
  color?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  imgSrc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  visibility?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface _AnyScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any';
}

export type _EntityResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']
> = ResolversObject<{
  __resolveType: TypeResolveFn<
    'Mutator' | 'Querier' | 'User',
    ParentType,
    ContextType
  >;
}>;

export type _ServiceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']
> = ResolversObject<{
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  Course?: CourseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Feedback?: FeedbackResolvers<ContextType>;
  Mutator?: MutatorResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  PositiveInt?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  PostContent?: PostContentResolvers<ContextType>;
  PostMetaTags?: PostMetaTagsResolvers<ContextType>;
  PostResponse?: PostResponseResolvers<ContextType>;
  Querier?: QuerierResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  _Any?: GraphQLScalarType;
  _Entity?: _EntityResolvers<ContextType>;
  _Service?: _ServiceResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = Context> = ResolversObject<{
  extends?: ExtendsDirectiveResolver<any, any, ContextType>;
  external?: ExternalDirectiveResolver<any, any, ContextType>;
  key?: KeyDirectiveResolver<any, any, ContextType>;
  provides?: ProvidesDirectiveResolver<any, any, ContextType>;
  requires?: RequiresDirectiveResolver<any, any, ContextType>;
}>;
