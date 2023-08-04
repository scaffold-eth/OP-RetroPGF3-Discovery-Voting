// import { prop,getModelForClass } from "@typegoose/typegoose";
// class Project {
//   @prop()
//   public name?: string;
//   @prop()
//   public category?: string;
//   @prop()
//   public payoutAddress?: string;
//   @prop()
//   public nominationUrl?: string;
//   @prop()
//   public  websiteUrl?: string;
//   @prop()
//   public  twitterLink?: string;
//   @prop()
//   public githubLink?: string;
//   @prop()
//   public description?: string;
//   @prop()
//   public questions1?: string;
//   @prop()
//   public questions2?: string;
//   @prop()
//   public questions3?: string;
//   @prop()
//   public email?: string;
//   @prop()
//   public discordHandle?: string;
//   @prop()
//   public slug?: string;
//   @prop()
//   public creatorAddress?:string;
// }
// export const Project  = getModelForClass(Project)
import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDocument extends Document {
  name?: string;
  category?: string;
  payoutAddress?: string;
  nominationUrl?: string;
  websiteUrl?: string;
  twitterLink?: string;
  githubLink?: string;
  description?: string;
  questions1?: string;
  questions2?: string;
  questions3?: string;
  email?: string;
  discordHandle?: string;
  slug?: string;
  creatorAddress?: string;
}

const projectSchema = new Schema<ProjectDocument>({
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  payoutAddress: {
    type: String,
  },
  nominationUrl: {
    type: String,
  },
  websiteUrl: {
    type: String,
  },
  twitterLink: {
    type: String,
  },
  githubLink: {
    type: String,
  },
  description: {
    type: String,
  },
  questions1: {
    type: String,
  },
  questions2: {
    type: String,
  },
  questions3: {
    type: String,
  },
  email: {
    type: String,
  },
  discordHandle: {
    type: String,
  },
  slug: {
    type: String,
  },
  creatorAddress: {
    type: String,
  },
});

// const Project = mongoose.model<ProjectDocument>("Projects", projectSchema);
const Project = mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Project;