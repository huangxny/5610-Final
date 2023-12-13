import { MongoClient } from 'mongodb';

const uri = 'add uri only when testing';
const dbName = 'mern-auth';
const collectionName = 'product';

const numberOfProductsToGenerate = 1000; // Change this number to generate more or fewer products

async function generateRandomProduct() {
  return {
    name: `Product ${Math.floor(Math.random() * 1000)}`, // Random product name
    price: Math.floor(Math.random() * 100) + 50, // Random price between 50 and 149
    width: Math.floor(Math.random() * 50) + 150, // Random width between 150 and 199
    diameter: Math.floor(Math.random() * 10) + 15, // Random diameter between 15 and 24
    aspectRatio: Math.floor(Math.random() * 50) + 50, // Random aspect ratio between 50 and 99
  };
}

async function insertRandomProducts(client) {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const products = [];
  for (let i = 0; i < numberOfProductsToGenerate; i++) {
    const randomProduct = await generateRandomProduct();
    products.push(randomProduct);
  }

  await collection.insertMany(products);
  console.log(
    `Inserted ${numberOfProductsToGenerate} random products into the ${collectionName} collection.`,
  );
}
// eslint-disable-next-line no-unused-vars
/*async function emptyCollection(client) {
  const database = client.db(dbName);
  const collection = database.collection(collectionName);
  await collection.deleteMany({});
  console.log(`Emptied the ${collectionName} collection.`);
}*/
async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    await insertRandomProducts(client);
    //await emptyCollection(client);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
