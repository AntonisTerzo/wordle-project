import express from 'express';

const highscoreRouter = express.Router()

highscoreRouter.get('/highscore', async (req, res) => {
    res.render('highscore');
})

export default highscoreRouter;