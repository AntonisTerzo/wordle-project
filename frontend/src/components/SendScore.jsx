import { useState } from 'react';

export default function SendScore({
  onPostScore,
  score,
  posted,
  onError,
  errorMessage,
  abort,
}) {
  const [player, setPlayer] = useState('');

  return (
    <div className='sendScore__wrapper'>
      {posted && (
        <>
          <h2 className='sendScore__postTitle'>Score posted!</h2>
          <p className='sendScore__postp'>
            Now you can check
            <br />
            the highscore list on
            <br />
            the highscore page
            <br />
            or start a new game.
          </p>
          <a className='sendScore__highscore' href='highscore'>
            Highscore List
          </a>
        </>
      )}
      {!posted && (
        <>
          <h2 className='sendScore__title'>Awesome win!</h2>
          <h2 className='sendScore__title--small'>
            Post your score and/or start a new game
          </h2>
          <hr className='wordleGame__line' />
          <ul className='sendScore__score'>
            <li className='sendScore__scoreItem'>
              {`Chosen Word: ${score.chosenWord.toUpperCase()}`}
            </li>
            <li className='sendScore__scoreItem'>
              {`Length of word: ${score.chosenWord.length}`}
            </li>
            <li className='sendScore__scoreItem'>
              {`Guesses: ${score.guesses.length}`}
            </li>
            <li className='sendScore__scoreItem'>
              {`Time: ${(score.endTime - score.startTime) / 1000}.sec`}
            </li>
            <li className='sendScore__scoreItem'>
              {`Duplicate letters: ${score.includeDuplicates}`}
            </li>
          </ul>
          <form
            action=''
            className='sendScore__post'
            onSubmit={(e) => {
              e.preventDefault();
              if (!player.length) {
                onError('Please insert a name before posting');
                return;
              }
              onPostScore(player);
            }}
          >
            <input
              className='sendScore__postInput'
              placeholder='Write your name'
              type='text'
              maxLength={10}
              onChange={(e) => {
                setPlayer(e.target.value);
              }}
            />
            <button className='sendScore__postSubmit' type='submit'>
              Post Score
            </button>
          </form>
        </>
      )}
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <a
        className='sendScore__newGame'
        onClick={(e) => {
          abort();
        }}
      >
        New game
      </a>
    </div>
  );
}
