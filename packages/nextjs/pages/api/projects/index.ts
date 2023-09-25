import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";

// Todo Api Middleware
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  await dbConnect();
  const { pageQuery } = req.query;
  const { limit } = req.query;
  if (pageQuery) {
    const page = parseInt(Array.isArray(pageQuery) ? pageQuery[0] : pageQuery, 10);
    const pagesLimit = limit && parseInt(Array.isArray(limit) ? limit[0] : limit, 10);
    // Pagination variables
    const pageSize: any = pagesLimit ?? 9;
    const totalProjects = await Project.countDocuments();
    const totalPages = Math.ceil(totalProjects / pageSize);

    if (page > totalPages) {
      return res.status(404).json({ message: "Page not found" });
    }

    // Determine the number of documents to skip based on the current page
    const skip = (page - 1) * pageSize;

    // Fetch the projects for the current page
    const projects: ProjectDocument[] = await Project.find().skip(skip).limit(pageSize).exec();

    console.log(`API GET /api/projects?pageQuery=${page}`);

    return res.status(200).json({ projects, totalPages });
  } else {
    // Fetch all projects if pageQuery isn't provided
    const projects: ProjectDocument[] = await Project.find({});

    console.log("API GET /api/projects");

    return res.status(200).json(projects);
  }
}
