import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

// 'Rock', 'Paper', 'Scissors'    - for orientation only

const score = { 
    'A X': 1 + 3,
    'A Y': 2 + 6,
    'A Z': 3 + 0,
    'B X': 1 + 0,
    'B Y': 2 + 3,
    'B Z': 3 + 6,
    'C X': 1 + 6,
    'C Y': 2 + 0,
    'C Z': 3 + 3,
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    return input.reduce((acc,val) => acc + score[val], 0);
};

const repair = {
    'A X': 'A Z',   // lose
    'A Y': 'A X',   // draw
    'A Z': 'A Y',   // win
    'B X': 'B X',
    'B Y': 'B Y',
    'B Z': 'B Z',
    'C X': 'C Y',
    'C Y': 'C Z',
    'C Z': 'C X',
    }

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    return input.reduce((acc,val) => acc + score[repair[val]], 0);
};

run({
    part1: {
        tests: [
            {
                input: `
A Y
B X
C Z`,
                expected: 15,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
A Y
B X
C Z`,
                expected: 12,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});
