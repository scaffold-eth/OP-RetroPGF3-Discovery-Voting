import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

// Todo Api Middleware
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  await dbConnect();
  const projects: ProjectDocument[] = await Project.find({});  
  console.log("API GET /api/projects");
  return res.status(200).json(projects);
}
