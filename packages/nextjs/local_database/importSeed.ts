// import the required modules
import projectsData from "./projects2.json";
// import { Collection, Db } from "mongodb";
import dbConnect from "~~/lib/dbConnect";
import Project, { ProjectDocument } from "~~/models/Project";


// const collectionName = "projects";

export async function seedDatabase() {
  try {
    // Connect to MongoDB using your dbConnect function
    // const connection = await dbConnect();
    await dbConnect();
    // const database: Db = connection.connection.db;
    console.log("Seeding...");
    // Get a reference to the collection
    // const collection: Collection<ProjectDocument> = database.collection(collectionName);

    // Read the JSON data directly as a JavaScript array of ProjectDocument objects
    const data = JSON.stringify(projectsData.projects);
    const jso = JSON.parse(data);
    const jsonData: ProjectDocument[] = jso;
    await Project.create(jsonData);
    console.log("Data inserted successfully.");

    // Check if data already exists in the collection
    // const existingData: ProjectDocument | null = await collection.findOne();

    // if (existingData) {
    //   console.log("Data already seeded. Skipping insertion.");
    // } else {
    // Insert the JSON data into the collection
    // await collection.insertMany(jsonData);
    //   await Project.create(jsonData)
    //   console.log("Data inserted successfully.");
    // }

    // Close the connection after seeding
    // await connection.disconnect();
  } catch (err) {
    console.error("Error seeding data:", err);
  }
}