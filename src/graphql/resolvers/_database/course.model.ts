import {Document, model, Schema} from 'mongoose';
import {Course} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface ICourseModel extends Omit<Course, 'id'>, Document {}

const CourseModel = new Schema(
  {
    id: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    nanoId: {type: String, required: true, unique: true},
    image: {type: String},
    lang: {type: String, enum: ['AR', 'EN'], default: 'EN'},
    authorId: {type: String, required: true},
    tagIds: {type: [String], required: true},
    visibility: {type: Boolean, required: true},
    publishedAt: {type: Date},
    isPremium: {type: Boolean, required: true},
    postIds: {type: [String], default: []},
  },
  {timestamps: true}
);

CourseModel.pre<ICourseModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }
  this.updatedAt = utc;
  next();
});

const CourseDbModel = model<ICourseModel>('Courses', CourseModel);
export default CourseDbModel;
