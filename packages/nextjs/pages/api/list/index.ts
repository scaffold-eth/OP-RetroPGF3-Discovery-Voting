import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import List from "~~/models/List";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed." });
  }
  /**
   * TODOs
   * INCLUDE SENDER SIGNATURE IN REQUEST
   * VERIFY SENDER IS AN OP BADGE HOLDER
   **/

  try {
    // Connect to the database
    await dbConnect();
    // get data from request
    const { name, creator, description, impactEvaluation, projects } = req.body;

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
