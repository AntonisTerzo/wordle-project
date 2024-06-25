import express from 'express';
import randomWord from '../utils/randomWord.js';
import feedback from '../utils/feedback.js';
import getWordList from '../utils/wordList.js';
import { playerScore } from '../src/models.js';
import { v4 as uuidv4 } from 'uuid';

const apiRouter = express.Router();
let gameSessions = [];
console.log(gameSessions);

apiRouter.post('/new_game', async (req, res) => {
  const gameSettings = req.body;
  const correctWord = await randomWord(
    await getWordList(),
    gameSettings.wordLength,
    gameSettings.includeDuplicates
  );
  if (!correctWord) {
    res
      .status(500)
      .json({ message: 'No word was found mathcing these criteria.' });
  } else {
    const gameSession = {
      gameId: uuidv4(),
      chosenWord: correctWord,
      startTime: Date.now(),
      guesses: [],
    };
    gameSessions.push(gameSession);
    res.status(200).json(gameSession.gameId);
  }
  console.log(gameSessions);
});

apiRouter.post('/:id/guesses', async (req, res) => {
  const gameId = req.params.id;
  const gameSession = gameSessions.find(
    (gameSession) => gameSession.gameId === gameId
  );
  if (!gameSession) {
    res
      .status(500)
      .json({ message: 'No game session found. Please start a new game.' });
  } else {
    const guess = req.body.newGuess;
    gameSession.guesses.push(guess);
    const guessResult = feedback(gameSession.chosenWord, guess);

    if (
      guessResult
        .map((letter) => letter.result)
        .every((value) => value === 'correct')
    ) {
      Object.assign(gameSession, {
        endTime: Date.now(),
        includeDuplicates:
          new Set(gameSession.chosenWord).size === gameSession.chosenWord.length
            ? false
            : true
      });
      res.send([guessResult, gameSession]);
    } else {
      res.send([guessResult]);
    }
    console.log(gameSessions);
  }
});

apiRouter.post('/:id/highscores', async (req, res) => {
  const gameId = req.params.id;
  const gameSession = gameSessions.find(
    (gameSession) => gameSession.gameId === gameId
  );
  if (!gameSession) {
    res
      .status(500)
      .json({ message: 'No highscore found. Please start a new game.' });
  } else {
    Object.assign(gameSession, {
      playerName: req.body.playerName,
      duration: (gameSession.endTime - gameSession.startTime) / 1000,
      guesses: gameSession.guesses.length,
    });
    const playerResultModel = new playerScore(gameSession);
    await playerResultModel.save();

    gameSessions = gameSessions.filter(
      (gameSession) => gameSession.gameId !== gameId
    );
    res.status(200).send('The score is saved successfully!');
    console.log(playerResultModel);
  }
});

export default apiRouter;
