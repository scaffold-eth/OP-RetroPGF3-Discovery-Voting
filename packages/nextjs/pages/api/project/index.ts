import dbConnect from "../../../lib/dbConnect";
import { ProjectModel } from "../../../models/Project";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

interface CreateProjectBody {
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
  creatorAddress?: string;
}

// Todo Api Middleware
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === "GET") {
    const projects = await ProjectModel.find({}).skip(10).limit(10).lean();

    console.log("API GET /api/projects");

    return res.status(200).json(projects);
  }

  if (req.method === "POST") {
    const { name, creatorAddress } = req.body as CreateProjectBody;

    if (!name) return res.status(400).send(`Missing required "name" body property`);
    if (!creatorAddress) return res.status(400).send(`Missing required "creatorAddress" body property`);

    if (!ethers.isAddress(creatorAddress)) return res.status(400).send(`Invalid Address`);

    const slug = slugify(name);
    const project = new ProjectModel({ ...req.body, slug });
    await project.save();

    console.log("API POST /api/projects");

    return res.status(200).json(project.toJSON());
  }
  return res.status(405).json({ error: "Method not allowed" });
}
