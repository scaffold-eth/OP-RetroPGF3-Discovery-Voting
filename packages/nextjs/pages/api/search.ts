import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import List from "~~/models/List";
import Project from "~~/models/Project";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  const { term, limit } = req.query;
  if (!term && !limit) return res.status(400).json({ massage: "Bad request" });
  // Connect to the database
  await dbConnect();
  // const searchLimit = req.query.term;
  const searchTerm = term as string;
  const searchLimit = limit as string;
  let listMatches = await List.find({ name: new RegExp(searchTerm, "i") });
  let projectMatches = await Project.find({ name: new RegExp(searchTerm, "i") });

  if (!term) {
    listMatches = await List.find({}).limit(parseInt(searchLimit));
    projectMatches = await Project.find({}).limit(parseInt(searchLimit));
  }

  const listResult = listMatches.map(list => ({
    ...list._doc,
    type: "list",
  }));

  const projectResult = projectMatches.map(project => ({
    ...project._doc,
    type: "project",
  }));
  console.log("GET /api/search");
  return res.status(200).json([...projectResult, ...listResult]);
}
