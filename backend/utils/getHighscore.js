import { playerScore } from '../src/models.js';

async function getHighscore() {
  const score = await playerScore.find().lean().sort({duration: 1, guesses: 1});
  return score;
}

export default getHighscore;