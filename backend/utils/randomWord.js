export default function randomWord(wordList, wordLength, includeDuplicates) {
    if (!wordList || !wordList.length || !Array.isArray(wordList)) {
        throw new Error('Invalid list provided!');
    }
    let filteredWords = wordList.filter(word => word.length === wordLength);

    if (includeDuplicates) {
        filteredWords = filteredWords.filter(word => new Set(word).size === word.length)
    }

    if (!filteredWords.length) {
        throw new Error('No matching words found!');
    } else {
        const selectedRandomWords = Math.floor(Math.random() * filteredWords.length);
        return filteredWords[selectedRandomWords];
    }
}