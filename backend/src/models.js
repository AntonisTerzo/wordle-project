import mongoose from 'mongoose';

const playerScore = mongoose.model('playerScore', {
    correctWord: String,
    wordLength: Number,
    includeDuplicates: Boolean,
    guesses: Number,
    duration: Number,
    playerName: String,
});

export { playerScore };