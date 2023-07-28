import {Document, model, Schema} from 'mongoose';
import {Feedback} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface IFeedbackModel
  extends Omit<Feedback, 'id' | 'user'>,
    Document {}

const FeedbackModel = new Schema(
  {
    id: {type: String, required: true, unique: true},
    authorId: {type: String, required: true},
    message: {type: String, required: true},
    resolved: {type: Boolean, default: false},
    title: {type: String, required: true},
  },
  {timestamps: true}
);

FeedbackModel.pre<IFeedbackModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }
  this.updatedAt = utc;
  next();
});

const FeedbackDbModel = model<IFeedbackModel>('feedback', FeedbackModel);
export default FeedbackDbModel;
