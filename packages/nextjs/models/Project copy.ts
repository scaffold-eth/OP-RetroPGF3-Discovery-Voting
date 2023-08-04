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
  profile: string;
  metadata: {
    name: string;
    category: string;
    payoutAddress: string;
    nominationUrl: string;
    websiteUrl: string;
    twitterLink: string;
    githubLink: string;
    description: string;
    question1: string;
    question2: string;
    question3: string;
    email: string;
    discordHandle: string;
  };
  profileImageKey: string;
  coverImageKey: string;
  accepted: boolean;
}

const projectSchema = new Schema<ProjectDocument>({
  profile: {
    type: String,
    required: true,
  },
  metadata: {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    payoutAddress: {
      type: String,
      required: true,
    },
    nominationUrl: {
      type: String,
      required: true,
    },
    websiteUrl: {
      type: String,
      required: true,
    },
    twitterLink: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    question1: {
      type: String,
      required: true,
    },
    question2: {
      type: String,
      required: true,
    },
    question3: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    discordHandle: {
      type: String,
      required: false,
    },
  },
  profileImageKey: {
    type: String,
    required: true,
  },
  coverImageKey: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
});

// const Project = mongoose.model<ProjectDocument>("Projects", projectSchema);
const Project = mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Project;