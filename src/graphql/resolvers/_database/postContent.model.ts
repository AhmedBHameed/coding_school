import {Document, model, Schema} from 'mongoose';
import {LanguageEnum, PostContent} from 'src/graphql/models';
import {getUTCTime} from 'src/util';

export interface IPostContentModel extends Omit<PostContent, 'id'>, Document {}

const PostContentModel = new Schema(
  {
    id: {type: String, required: true, unique: true},
    postImage: {type: String, required: true},
    lang: {
      type: String,
      enum: [LanguageEnum.Ar, LanguageEnum.En],
      default: LanguageEnum.En,
    },
    body: {type: String, default: ''},
    contentPreview: {type: String, default: ''},
    readingTime: {type: String, default: ''},
    metaTags: {
      injectHeader: {type: String, default: ''},
      injectCssStyle: {type: String, default: ''},
      description: {type: String, default: ''},
    },
    likes: {type: Number},
    publishedAt: {type: Date, default: ''},
  },
  {timestamps: true}
);

PostContentModel.pre<IPostContentModel>('save', function init(this, next) {
  const utc = getUTCTime(new Date());
  if (!this.createdAt) {
    this.createdAt = utc;
  }

  this.updatedAt = utc;
  next();
});

const PostDbModel = model<IPostContentModel>('Post_content', PostContentModel);
export default PostDbModel;
