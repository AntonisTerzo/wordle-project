import { useState } from 'react';

export default function SetDifficulty({ onStartGame, error }) {
  const [length, setLength] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <form
        className='difficulty'
        onSubmit={(e) => {
          e.preventDefault();
          if (length < 4 || length > 8) {
            error('Choose a length between 4 and 8');
            return;
          }
          const difficulty = {
            wordLength: length,
            includeDuplicates: isChecked,
          };
          onStartGame(difficulty);
        }}
      >
        <label className='difficulty__info'>
          Choose the length of the word between 4 and 8:
        </label>
        <input
          className='difficulty__setLength'
          id='setLength'
          type='text'
          value={length}
          maxLength={2}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            setLength(Number(numericValue));
          }}
        ></input>
        <hr className='wordleGame__line' />
        <label className='difficulty__info'>
          Choose if duplicate letters should exist:
        </label>
        <input
          className='difficulty__setDuplicates'
          id='setDuplicates'
          type='checkbox'
          value={isChecked}
          onChange={checkHandler}
        ></input>
        <button className='difficulty__start gameButton' type='submit'>
          START
        </button>
        <p>
          You will now have 6 tries to win the game. Good luck!
        </p>
      </form>
    </>
  );
}
