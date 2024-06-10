import express from 'express';
import { playerScore } from '../src/models.js';

const highscoreRouter = express.Router();

highscoreRouter.post('/submitScore', async (req, res) => {
  try {
    const playerResults = req.body;
    const playerResultModel = new playerScore(playerResults);
    await playerResultModel.save();
    res.status(200).send('The score is saved successfully!');
  } catch (error) {
    res.status(500).send('Whoa, a terrible thing happend, try again!');
  }
});

export default highscoreRouter;
