import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~~/lib/dbConnect";
import List, { ListDocument } from "~~/models/List";
import VerifyOptions from "~~/types/verifyOptions";
import { verifySignature } from "~~/utils/sign";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { address, listId, signature } = req.body;

  await dbConnect();

  const list = await List.findById(listId);
  if (!list) {
    return res.status(404).json({ message: "List not found" });
  }

  const isAuthorized = await isUserAuthorized(address, list, signature);
  if (!isAuthorized) {
    return res.status(401).json({ message: "Not Authorized: Invalid signature" });
  }

  const wasLiked = toggleLikeForAddress(address, list);

  await list.save();

  return res.status(200).json({
    message: wasLiked ? "List Unliked" : "List Liked",
    isLiked: !wasLiked,
  });
}

async function isUserAuthorized(address: string, list: ListDocument, signature: string): Promise<boolean> {
  const options: VerifyOptions = {
    address,
    messageId: "listLike",
    list,
  };
  return verifySignature(signature, options);
}

function toggleLikeForAddress(address: string, list: ListDocument): boolean {
  const likesSet = new Set(list.likes ?? []);
  const wasLiked = likesSet.has(address);
  wasLiked ? likesSet.delete(address) : likesSet.add(address);
  list.likes = Array.from(likesSet);
  return wasLiked;
}
