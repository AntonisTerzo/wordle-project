export default function Gameover({abort}) {
  return (
    <div className='gameOver'>
      <h1 className='gameOver__h1'>Game Over</h1>
      <p className='gameOver__p'>
        Unfortunately you did not make it. Better luck next time.
      </p>
      <div>
        <a
          className='gameOver__newGame'
          onClick={() => {
            abort();
          }}
        >
          New game
        </a>
      </div>
    </div>
  );
}
