import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';
import highscoreRouter from '../routes/highscore.js';
import getHighscore from '../utils/getHighscore.js';

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/about', (req, res) => {
  res.render('about');
});
highscoreRouter.get('/highscore', async (req, res) => {
  try {
    const highScore = await getHighscore();
    res.render('highscore', { highScore });
  } catch (error) {
    res.status(500).send('Whoa, a terrible thing happend, try again!');
  }
});
app.use('/', highscoreRouter);

export default app;
