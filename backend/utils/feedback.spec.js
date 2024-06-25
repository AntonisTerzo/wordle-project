import { describe, expect, it } from '@jest/globals'

import feedback from './feedback.js';

/*
Test strategy:
1. Create the tests
2. Run all the tests (all of them fail)
3. Create the algorithm
4. Run all the tests again and check which one fails and which is one succeeds
5. Find solution for the ones that fail
6. When all the tests succeed, the algorithm is correct
*/

describe('feedback()', () => {
    it('finds the correct word', () => {
        const output = feedback('hello', 'hello');
        expect(output).toEqual([
            { letter: 'h', result: 'correct' },
            { letter: 'e', result: 'correct' },
            { letter: 'l', result: 'correct' },
            { letter: 'l', result: 'correct' },
            { letter: 'o', result: 'correct' },
        ]);
    });
    it('finds incorect letters to the word', () => {
        const output = feedback('vow', 'low');
        expect(output).toEqual([
            { letter: 'l', result: 'incorrect' },
            { letter: 'o', result: 'correct' },
            { letter: 'w', result: 'correct' },
        ]);
    });
    it('finds misplaced letters to the word', () => {
        const output = feedback('actor', 'cator');
        expect(output).toEqual([
            { letter: 'c', result: 'misplaced' },
            { letter: 'a', result: 'misplaced' },
            { letter: 't', result: 'correct' },
            { letter: 'o', result: 'correct' },
            { letter: 'r', result: 'correct' },
        ]);
    });
    it('finds incorect and misplaced letters to the word', () => {
        const output = feedback('cykla', 'hallå');
        expect(output).toEqual([
            { letter: 'h', result: 'incorrect' },
            { letter: 'a', result: 'misplaced' },
            { letter: 'l', result: 'incorrect' },
            { letter: 'l', result: 'correct' },
            { letter: 'å', result: 'incorrect' },
        ]);
    });
});