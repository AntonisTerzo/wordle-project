export default function feedback(word, guess) {
    const correctWord = word.toLowerCase().split('');
    const guessedWord = guess.toLowerCase().split('');
    const answer = []

    for (let i = 0; i < correctWord.length; i++) {
        if (correctWord[i] === guessedWord[i]) {
            answer[i] = { letter: guessedWord[i], result: "correct" }
            correctWord[i] = null
        } else {
            answer[i] = { letter: guessedWord[i], result: "incorrect" }
        }
    }


    for (let i = 0; i < correctWord.length; i++) {
        if (answer[i].result.includes('incorrect') && correctWord.includes(guessedWord[i])) {
            answer[i].result = 'misplaced'
            correctWord[correctWord.indexOf(guessedWord[i])] = null;
        }
    }
    return answer;
}