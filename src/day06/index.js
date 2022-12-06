import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('');


const findMarker = (input, markerLength) => {
    for (let i=markerLength; i<input.length; i++) {
        let buffer = input.slice(i-markerLength, i).sort();
        let markerFound = true;
        for(let j=1; j<buffer.length;j++) {
            if (buffer[j-1] === buffer[j]) {
                markerFound = false;
                break;
            }
        }

        if (markerFound) {
            return i;
        }
    }
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    return findMarker(input, 4);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    return findMarker(input, 14);
};

run({
    part1: {
        tests: [
            {
                input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
                expected: 7,
            },
            {
                input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
                expected: 5,
            },
            {
                input: `nppdvjthqldpwncqszvftbrmjlhg`,
                expected: 6,
            },
            {
                input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
                expected: 10,
            },
            {
                input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
                expected: 11,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
                expected: 19,
            },
            {
                input: `bvwbjplbgvbhsrlpgdmjqwftvncz`,
                expected: 23,
            },
            {
                input: `nppdvjthqldpwncqszvftbrmjlhg`,
                expected: 23,
            },
            {
                input: `nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
                expected: 29,
            },
            {
                input: `zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`,
                expected: 26,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
