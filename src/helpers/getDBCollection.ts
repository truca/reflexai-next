import { MongoClient } from "mongodb";

function getDBCollection(collectionName: string) {
  const client = new MongoClient(process.env.MONGODB_URI, {
    monitorCommands: true,
  });

  client.on("commandStarted", (started) => console.log(started));
  return client.db("reflexai").collection(collectionName);
}

export default getDBCollection;
