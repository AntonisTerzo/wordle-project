import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import 'dotenv/config';
import getHighscore from '../utils/getHighscore.js';
import apiRouter from '../routes/gameLogic.js';

mongoose.connect(process.env.DB_URL);

const app = express();

app.use(express.json());
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/highscore', async (req, res) => {
  try {
    const highScore = await getHighscore();
    res.render('highscore', { highScore });
  } catch (error) {
    res.status(500).send('Whoa, a terrible thing happend, try again!');
  }
});
app.use('/api', apiRouter);

app.use(express.static('../frontend/dist'))
app.use('/static', express.static('./static'));
export default app;