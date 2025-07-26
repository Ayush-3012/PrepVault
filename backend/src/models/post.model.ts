import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  fileUrl?: string;
  subject: string;
  course: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    fileUrl: { type: String },
    subject: { type: String, required: true },
    course: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);
export default Post;
