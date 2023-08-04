import mongoose from "mongoose";

export interface ListDocument extends mongoose.Document {
  name: string;
  creator: string;
  description: string;
  impactEvaluation: string;
  projects: {
    project: mongoose.Types.ObjectId;
    votes: number;
  }[];
}

const listSchema = new mongoose.Schema<ListDocument>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  creator: {
    type: String,
    required: true,
  },
  impactEvaluation: {
    type: String,
  },
  projects: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
      },
      votes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const List = mongoose.models.Lists || mongoose.model("Lists", listSchema);

export default List;