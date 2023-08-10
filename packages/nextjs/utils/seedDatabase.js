/**
 * @Dev Function to help seed database with projects data from
 * OP RPGF Round 2 directly without using `dbConnect()` function
 * @Params `uri` - MongoDB connection URI
 * @Usage call: `node ./PATH/TO/seedDatabase.js` in the terminal
 * @Notice if using this method comment out 'seedDatabse(...)' in `../lib/dbConnect.ts`
 * */

const projectsData = require("../local_database/projectsData.json");
const { MongoClient, ServerApiVersion } = require("mongodb");

async function seedDatabase(uri) {
  if (!uri) return console.log("NO URI FOUND");
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  console.log("Starting operation...");

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db("op-rpgf");
    const collection = db.collection("projects");
    const existingCount = await collection.countDocuments();
    if (isSeeding || existingCount < 10) {
      await collection.deleteMany({}); // Clear existing data
      await collection.insertMany(projectsData);
      console.log("Database seeded successfully!");
    } else {
      return console.log("Already seeded! skipping...");
    }
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
}
seedDatabase("YOUR_MONGODB_URI");
