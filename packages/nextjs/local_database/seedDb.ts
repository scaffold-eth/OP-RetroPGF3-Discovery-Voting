import projectsData from "./projectsData.json";
import { MongoClient, ServerApiVersion } from "mongodb";

/*****************************************************************************************
 * @Dev Function to help seed database with projects data from OP RPGF Round 2
 * @Notice called in `../lib/dbConnect.ts`
 * @Params `uri` - MongoDB connection URI
 * @Params `isSeeding` - Condition to determine whether to proceed with the seeding or not
 * ***************************************************************************************
 * TODOs
 * Move DATABASE_NAME & COLLECTION_NAME to function parameters
 *****************************************************************************************/

export async function seedDatabase(uri: string | undefined, isSeeding: boolean) {
  if (!uri) {
    console.log("NO URI FOUND");
    return;
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("project-voting-staging"); // set to YOUR_DATABASE_NAME if different
    const collection = db.collection("projects"); // set to YOUR_COLLECTION_NAME if different
    console.log("Checking database...");

    const existingCount = await collection.countDocuments();
    console.log("Existing projects count:", existingCount);

    if (isSeeding || existingCount < 10) {
      await collection.deleteMany({}); // Clear existing data
      await collection.insertMany(projectsData);
      console.log("Database seeded successfully!");
    } else {
      return console.log("Already seeded! skipping...");
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
