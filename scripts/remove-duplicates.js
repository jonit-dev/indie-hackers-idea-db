#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../src/data/microSaasIdeas.json');

function removeDuplicates() {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const ideas = JSON.parse(rawData);
    
    const originalCount = ideas.length;
    console.log(`🔄 Processing ${originalCount} ideas...`);
    
    // Track unique combinations of productName and URL
    const seen = new Set();
    const duplicates = [];
    
    // Filter out duplicates
    const uniqueIdeas = ideas.filter((idea, index) => {
      const productName = idea.productName || '';
      const url = idea.url || '';
      
      // Create a unique key combining productName and URL
      // Handle cases where either might be missing
      const key = `${productName.toLowerCase().trim()}|||${url.toLowerCase().trim()}`;
      
      if (seen.has(key)) {
        duplicates.push({
          index,
          id: idea.id,
          productName: idea.productName,
          url: idea.url,
          duplicate_of_key: key
        });
        return false;
      }
      
      seen.add(key);
      return true;
    });
    
    const removedCount = originalCount - uniqueIdeas.length;
    
    if (removedCount > 0) {
      console.log(`🗑️  Removed ${removedCount} duplicate(s):`);
      duplicates.forEach(dup => {
        console.log(`   - ID ${dup.id}: "${dup.productName}" (${dup.url})`);
      });
      
      // Write the cleaned data back to file
      fs.writeFileSync(dataPath, JSON.stringify(uniqueIdeas, null, 2));
      console.log(`✅ Cleaned data saved. Now has ${uniqueIdeas.length} unique ideas.`);
    } else {
      console.log('✅ No duplicates found. Data is clean!');
    }
    
  } catch (error) {
    console.error('❌ Error processing duplicates:', error.message);
    process.exit(1);
  }
}

// Run the deduplication
removeDuplicates();