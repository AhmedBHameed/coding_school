import {Document, model, Schema} from 'mongoose';
import {Post, PostTypeEnum} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface IPostModel extends Omit<Post, 'id'>, Document {}

const PostModel = new Schema(
  {
    id: {type: String, required: true, unique: true},
    slug: {type: String, required: true},
    nanoId: {type: String, required: true, unique: true},
    authorId: {type: String, required: true},
    groupName: {type: String, default: ''},
    tagIds: {type: [String], required: true},
    type: {
      type: String,
      enum: [PostTypeEnum.Course, PostTypeEnum.Article],
      default: PostTypeEnum.Article,
    },
    isPremium: {type: Boolean, required: true},
    visibility: {type: Boolean, default: false},
    courseId: {type: String},
    postContentIds: {type: [String], default: []},
    nextPostId: {type: String, default: ''},
    prevPostId: {type: String, default: ''},
    accessedByUserIds: {type: [String], default: []},
  },
  {timestamps: true}
);

PostModel.pre<IPostModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }
  this.updatedAt = utc;
  next();
});

const PostDbModel = model<IPostModel>('Posts', PostModel);
export default PostDbModel;
