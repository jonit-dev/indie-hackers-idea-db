import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MicroSaasIdea } from '../src/types/idea.js';
import { calculateDeterministicScore, getScoreBreakdown } from '../src/utils/scoring.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../src/data/microSaasIdeas.json');

function testScoring() {
  const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
  const ideas: MicroSaasIdea[] = JSON.parse(rawData);

  console.log('🧮 Testing Deterministic Scoring System\n');

  // Test a few specific ideas with different characteristics
  const testIds = ['1', '2', '5', '47']; // Pick variety of ideas
  
  testIds.forEach(id => {
    const idea = ideas.find(i => i.id === id);
    if (!idea) return;
    
    const breakdown = getScoreBreakdown(idea);
    const calculatedScore = calculateDeterministicScore(idea);
    
    console.log(`📊 ID ${id}: ${idea.niche || 'Unknown Niche'}`);
    console.log(`   MRR: $${idea.mrr?.toLocaleString()}`);
    console.log(`   Complexity: ${idea.complexity}/5, MVP: ${idea.mvpWk}wk, Maint: ${idea.maintHours}h`);
    console.log(`   Competition: ${idea.comp}, Market Proof: ${idea.marketProof}`);
    console.log(`   Breakdown: Rev(${breakdown.revenue}/25) + Market(${breakdown.market}/20) + Exec(${breakdown.execution}/20) + Speed(${breakdown.speed}/15) + Growth(${breakdown.growth}/10) + Ops(${breakdown.operational}/10)`);
    console.log(`   Final Score: ${calculatedScore}/100 ${calculatedScore === idea.score ? '✅' : '❌ (stored: ' + idea.score + ')'}\n`);
  });

  // Show top and bottom performers
  const sortedByScore = ideas.sort((a, b) => b.score - a.score);
  
  console.log('🏆 Top 5 Highest Scoring Ideas:');
  sortedByScore.slice(0, 5).forEach(idea => {
    console.log(`   ${idea.score}: ${idea.niche} (MRR: $${idea.mrr?.toLocaleString()})`);
  });
  
  console.log('\n📉 Bottom 5 Lowest Scoring Ideas:');
  sortedByScore.slice(-5).forEach(idea => {
    console.log(`   ${idea.score}: ${idea.niche} (MRR: $${idea.mrr?.toLocaleString()})`);
  });
}

testScoring();