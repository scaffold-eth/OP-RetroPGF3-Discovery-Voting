import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import List, { ListDocument } from "~~/models/List";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Connect to the database
  await dbConnect();
  if (req.method === "GET") {
    const { pageQuery } = req.query;
    const { limit } = req.query;
    if (pageQuery) {
      const page = parseInt(Array.isArray(pageQuery) ? pageQuery[0] : pageQuery, 10);
      const pagesLimit = limit && parseInt(Array.isArray(limit) ? limit[0] : limit, 10);
      // Pagination variables
      const pageSize: any = pagesLimit ?? 9;
      const totalProjects = await List.countDocuments();
      const totalPages = Math.ceil(totalProjects / pageSize);
      if (page > totalPages) {
        return res.status(404).json({ message: "Page not found" });
      }

      // Determine the number of documents to skip based on the current page
      const skip = (page - 1) * pageSize;

      // Fetch the projects for the current page
      const lists: ListDocument[] = await List.find().skip(skip).limit(pageSize).exec();

      console.log(`API GET /api/list?pageQuery=${page}`);

      return res.status(200).json({ lists, totalPages });
    } else {
      const lists: ListDocument[] = await List.find({});
      return res.status(200).json(lists);
    }
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  /**
   * TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN OP BADGE HOLDER
   **/

  try {
    // get data from request
    const { name, creator, description, impactEvaluation, projects, tags } = req.body;

    // Validate the required fields
    if (!name || !creator || !projects) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    // Create a new list using the List model
    const newList = new List({
      name,
      creator,
      description,
      impactEvaluation,
      projects,
      tags,
    });

    // Save the list to the database
    await newList.save();

    // Respond with the created list
    res.status(201).json(newList);
  } catch (error: any) {
    console.error("Error creating the list:", error);
    res.status(500).json({ message: "An unexpected error occurred while creating the list." });
  }
}
