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

const Project = mongoose.models.Projects || mongoose.model("Projects", projectSchema);

export default Project;
