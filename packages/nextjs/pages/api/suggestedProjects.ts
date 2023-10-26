import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import Project, { IProject } from "~~/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  await dbConnect();
  const { category, currentProjectId } = req.query;
  console.log(category, currentProjectId);
  const suggestedProjects: IProject[] = await Project.find({
    impactCategory: category,
    _id: { $ne: new ObjectId(currentProjectId as string) },
  }).limit(3);
  console.log(suggestedProjects);
  return res.status(200).json(suggestedProjects);
}
