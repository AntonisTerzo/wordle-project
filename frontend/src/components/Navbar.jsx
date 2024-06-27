export default function Navbar() {

    return (
        <header className="header">
        <nav className="navbar">
            <a className="navbar__home" href="/">Home</a>
            <a className="navbar__highscore" href="highscore">Highscores</a>
            <a className="navbar__about" href="about">About Wordle</a>
        </nav>
        </header>
    )
}