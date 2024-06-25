import mongoose from 'mongoose';

const playerScore = mongoose.model('playerScore', {
    gameId: String,
    chosenWord: String,
    startTime: Number,
    guesses: Number,
    endTime: Number,
    includeDuplicates: Boolean,
    playerName: String,
    duration: Number,
});

export { playerScore };