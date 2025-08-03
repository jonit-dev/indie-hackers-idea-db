import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current data
const dataPath = path.join(__dirname, '../src/data/microSaasIdeas.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`Original data has ${data.length} ideas`);

// Track URLs we've seen and keep the first occurrence of each unique URL
const seenUrls = new Set();
const uniqueIdeas = [];
const duplicates = [];

data.forEach((idea, index) => {
  if (!seenUrls.has(idea.url)) {
    seenUrls.add(idea.url);
    uniqueIdeas.push(idea);
  } else {
    duplicates.push({
      id: idea.id,
      url: idea.url,
      niche: idea.niche,
      originalIndex: index
    });
    console.log(`Duplicate found: ID ${idea.id} - ${idea.niche} (${idea.url})`);
  }
});

console.log(`\nFound ${duplicates.length} duplicates`);
console.log(`Unique ideas: ${uniqueIdeas.length}`);

// Reassign sequential IDs starting from 1
uniqueIdeas.forEach((idea, index) => {
  idea.id = (index + 1).toString();
});

// Write the deduplicated data back
fs.writeFileSync(dataPath, JSON.stringify(uniqueIdeas, null, 2));

console.log(`\nDeduplication complete!`);
console.log(`Removed ${duplicates.length} duplicate entries`);
console.log(`Final dataset: ${uniqueIdeas.length} unique ideas`);

// Log some of the removed duplicates for reference
console.log('\nFirst 10 removed duplicates:');
duplicates.slice(0, 10).forEach(dup => {
  console.log(`- ID ${dup.id}: ${dup.niche}`);
});

if (duplicates.length > 10) {
  console.log(`... and ${duplicates.length - 10} more duplicates removed`);
}