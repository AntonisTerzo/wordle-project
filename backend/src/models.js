import mongoose from 'mongoose';

const playerScore = mongoose.model('playerScore', {
    correctWord: String,
    wordLength: Number,
    includeDuplicates: Boolean,
    startTime: Number,
    endTime: Number,
    playerName: String,
});