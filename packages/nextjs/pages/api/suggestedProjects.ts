import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  await dbConnect();
  const { category, currentProjectId } = req.query;
  const suggestedProjects: ProjectDocument[] = await Project.find({ category, _id: { $ne: currentProjectId } }).limit(
    3,
  );

  return res.status(200).json(suggestedProjects);
}
