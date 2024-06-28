export default function Gameover({ abort }) {
  return (
    <div className='gameOver'>
      <h1 className='gameOver__h1'>
        Game Over<img className='gameOver__img' src='/rip.png'></img>
      </h1>
      <p className='gameOver__p'>
        Unfortunately you did not make it this time. Better luck next time.
      </p>
      <a
        className='gameOver__newGame'
        onClick={() => {
          abort();
        }}
      >
        New game
      </a>
    </div>
  );
}
