import mongoose from 'mongoose';

const playerScoreSchema = new mongoose.Schema({
    gameId: String,
    chosenWord: String,
    startTime: Number,
    guesses: Number,
    endTime: Number,
    includeDuplicates: Boolean,
    playerName: String,
    duration: Number,
});

const playerScore = mongoose.model('playerScore', playerScoreSchema)

export { playerScore };