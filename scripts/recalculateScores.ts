import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MicroSaasIdea } from '../src/types/idea.js';
import { calculateDeterministicScore, getScoreBreakdown } from '../src/utils/scoring.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '../src/data/microSaasIdeas.json');

function recalculateAllScores() {
  console.log('Reading data...');
  const rawData = fs.readFileSync(DATA_PATH, 'utf-8');
  const ideas: MicroSaasIdea[] = JSON.parse(rawData);

  console.log(`Found ${ideas.length} ideas to recalculate`);

  let changedCount = 0;
  const scoreChanges: Array<{
    id: string;
    oldScore: number;
    newScore: number;
    breakdown: any;
  }> = [];

  ideas.forEach((idea, index) => {
    const oldScore = idea.score;
    const newScore = calculateDeterministicScore(idea);
    
    if (oldScore !== newScore) {
      changedCount++;
      const breakdown = getScoreBreakdown(idea);
      scoreChanges.push({
        id: idea.id,
        oldScore,
        newScore,
        breakdown
      });
      
      // Update the score
      ideas[index].score = newScore;
      
      // Update rationale to indicate deterministic calculation
      ideas[index].rationale = `Deterministically calculated: Revenue (${breakdown.revenue}/25) + Market (${breakdown.market}/20) + Execution (${breakdown.execution}/20) + Speed (${breakdown.speed}/15) + Growth (${breakdown.growth}/10) + Operations (${breakdown.operational}/10) = ${newScore}/100`;
    }
  });

  console.log(`\nScore changes for ${changedCount} ideas:`);
  scoreChanges.forEach(change => {
    const direction = change.newScore > change.oldScore ? '↑' : '↓';
    const diff = Math.abs(change.newScore - change.oldScore);
    console.log(`ID ${change.id}: ${change.oldScore} → ${change.newScore} ${direction}${diff} pts`);
  });

  if (changedCount > 0) {
    console.log('\nWriting updated data...');
    fs.writeFileSync(DATA_PATH, JSON.stringify(ideas, null, 2));
    console.log(`✅ Updated ${changedCount} scores out of ${ideas.length} ideas`);
  } else {
    console.log('✅ All scores already up to date');
  }

  // Show summary statistics
  const scores = ideas.map(idea => idea.score);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);

  console.log(`\nSummary Statistics:`);
  console.log(`Average Score: ${avgScore.toFixed(1)}`);
  console.log(`Score Range: ${minScore} - ${maxScore}`);
  console.log(`Distribution:`);
  console.log(`  90-100: ${scores.filter(s => s >= 90).length} ideas`);
  console.log(`  80-89:  ${scores.filter(s => s >= 80 && s < 90).length} ideas`);
  console.log(`  70-79:  ${scores.filter(s => s >= 70 && s < 80).length} ideas`);
  console.log(`  60-69:  ${scores.filter(s => s >= 60 && s < 70).length} ideas`);
  console.log(`  50-59:  ${scores.filter(s => s >= 50 && s < 60).length} ideas`);
  console.log(`  <50:    ${scores.filter(s => s < 50).length} ideas`);
}

// Run the function
recalculateAllScores();