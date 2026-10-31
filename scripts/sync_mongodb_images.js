const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read MONGODB_URI from .env.local
const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf-8');
const uriMatch = envContent.match(/MONGODB_URI=\s*(.*?)\s*$/m);
const uri = uriMatch ? uriMatch[1].trim() : null;

if (!uri) {
  console.error('No MONGODB_URI found in .env.local');
  process.exit(1);
}

const ComponentSchema = new mongoose.Schema({
  name: String,
  model: String,
  category: String,
  status: String,
  quantity: Number,
  availableQuantity: Number,
  location: String,
  specs: [String],
  image: String,
  borrowable: Boolean,
  notes: String,
}, { timestamps: true });

const ComponentModel = mongoose.models.Component || mongoose.model('Component', ComponentSchema);

// Read updated components from componentsData.ts
const compDataContent = fs.readFileSync(path.resolve(process.cwd(), 'src/data/componentsData.ts'), 'utf8');

const regex = /name:\s*["']([^"']+)["'][\s\S]*?image:\s*["']([^"']+)["']/g;
const items = [];
let match;
while ((match = regex.exec(compDataContent)) !== null) {
  items.push({ name: match[1], image: match[2] });
}

console.log(`Parsed ${items.length} components from componentsData.ts`);

async function run() {
  await mongoose.connect(uri);
  console.log('Connected to MongoDB Atlas!');

  let updated = 0;
  for (const item of items) {
    const res = await ComponentModel.updateMany(
      { name: item.name },
      { $set: { image: item.image } }
    );
    if (res.matchedCount > 0) {
      console.log(`[UPDATED IN ATLAS] ${item.name} -> ${item.image}`);
      updated += res.modifiedCount;
    } else {
      console.log(`[NO MATCH IN ATLAS] ${item.name}`);
    }
  }

  console.log(`Sync complete! Updated ${updated} records in MongoDB Atlas.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error('MongoDB sync error:', err);
  process.exit(1);
});
