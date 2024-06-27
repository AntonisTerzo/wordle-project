import { useState, useEffect, useRef } from 'react';
import GuessWord from './components/GuessWord';
import SetDifficulty from './components/SetDifficulty';
import SendScore from './components/SendScore';
import './scss/app.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [results, setResults] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [win, setWin] = useState(false);
  const [wordLength, setWordLength] = useState();
  const [score, setScore] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [gameId, setGameId] = useState();
  const [posted, setPosted] = useState(false);
  const timerId = useRef(null);

  useEffect(() => {
    if (errorMessage) {
      timerId.current = setTimeout(() => {
        setErrorMessage();
      }, 3000);
    }
    return () => {
      clearTimeout(timerId.current);
    };
  }, [errorMessage]);

  async function handleStartGame(chosenDifficulty) {
    const response = await fetch('/api/new_game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chosenDifficulty),
    });

    if (response.ok) {
      setStartGame(!startGame);
      setWordLength(chosenDifficulty.length);
      const id = await response.json();
      setGameId(id);
    } else {
      handleError('No word found');
    }
  }

  async function handleGuess(newGuess) {
    if (!newGuess) {
      return;
    }

    const response = await fetch(`/api/${gameId}/guesses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newGuess }),
    });

    if (response.ok) {
      const data = await response.json();

      if (!data[0].length) {
        return;
      }

      const updatedresults = [...results, data[0]];

      setResults(updatedresults);

      if (data[1]) {
        setScore(data[1]);
        setWin(!win);
      }
    } else {
      const data = await response.json();
      handleError(data);
    }
  }

  async function handleScore(playerName) {
    const response = await fetch(`/api/${gameId}/highscores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playerName }),
    });
    if (!response.ok) {
      handleError(await response.json());
    } else {
      setPosted(true);
    }
  }

  function handleAbort() {
    setStartGame(!startGame);
    setWin(false);
    setResults([]);
    setScore();
    setGameId();
    setPosted(false);
  }

  function handleError(message) {
    setErrorMessage(message);
  }

  return (
    <>
      <div className='wordleGame'>
        <Navbar />
        <div className='wordleGame__wrapper'>
          {win && (
            <SendScore
              onPostScore={handleScore}
              score={score}
              abort={handleAbort}
              posted={posted}
              onError={handleError}
              errorMessage={errorMessage}
            />
          )}
          {!startGame}
          <h2 className='wordleGame__title'>
            {!startGame ? 'Game Settings' : 'Guess the word!'}
          </h2>
          <hr className='wordleGame__line' />
          {!startGame && (
            <SetDifficulty onStartGame={handleStartGame} error={handleError} />
          )}
          {startGame && (
            <GuessWord
              onGuess={handleGuess}
              maxInput={wordLength}
              abort={handleAbort}
              results={results}
              error={handleError}
            />
          )}
          {errorMessage && <p className='error'>{errorMessage}</p>}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
