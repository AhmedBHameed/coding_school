import {Document, model, Schema} from 'mongoose';
import {Tag} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface ITagModel extends Omit<Tag, 'id'>, Document {}

const TagModel = new Schema(
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

TagModel.pre<ITagModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }
  this.updatedAt = utc;
  next();
});

const TagDbModel = model<ITagModel>('Tags', TagModel);
export default TagDbModel;
