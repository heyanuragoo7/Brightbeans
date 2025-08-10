const path = require ('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./connectdb/dbconnect.js');
const Product = require('./model/model.js');
const Options = require('./model/option.js')

const dataPath = path.join(__dirname, './data.json');

async function seed() {
  await connectDB();

  const raw = fs.readFileSync(dataPath, 'utf-8');
  const json = JSON.parse(raw);

  if (!json.products || !Array.isArray(json.products)) {
    console.error('products.json must contain a "products" array');
    process.exit(1);
  }

  try {
    await Product.deleteMany({});
    await Product.insertMany(json.products);
    
    await Options.deleteMany({});
    await Options.create({
      total: json.total,
      skip: json.skip,
      limit: json.limit
    });

    console.log('Seed completed');
    
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit();
  }
}

seed();
