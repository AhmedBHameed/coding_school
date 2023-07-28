import {Document, model, Schema} from 'mongoose';
import {Tag} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface IPostLikeModel extends Omit<Tag, 'id'>, Document {}

const PostLikeModel = new Schema(
  {
    id: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    imgSrc: {type: String, required: true},
    description: {type: String, default: ''},
    color: {type: String, required: true},
    visibility: {type: Boolean, required: true},
  },
  {timestamps: true}
);

PostLikeModel.pre<IPostLikeModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }
  this.updatedAt = utc;
  next();
});

const PostLikeDbModel = model<IPostLikeModel>('post_like', PostLikeModel);
export default PostLikeDbModel;
