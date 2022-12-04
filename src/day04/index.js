import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(sections=>sections.split(',').map(pair=>pair.split('-').map(Number)));

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    let result = 0;
    for(let i=0; i<input.length; i++) {
        let [a,b] = input[i];
        if ((a[0]<=b[0] && a[1]>=b[1]) || (a[0]>=b[0] && a[1]<=b[1])) {
            result++;
        }
    }

    return result;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    let result = 0;
    for(let i=0; i<input.length; i++) {
        let [a,b] = input[i];
        if (
            (a[0]<=b[0] && a[1]>=b[1]) ||    // b fully contained in a
            (a[0]>=b[0] && a[1]<=b[1]) ||    // a fully contained in b
            (a[0]>=b[0] && a[0]<=b[1]) ||    // a[0] within b
            (a[1]>=b[0] && a[1]<=b[1])       // a[1] within b
        ) {
            result++;
        }
    }

    return result;
};

run({
    part1: {
        tests: [
            {
                input: `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`,
                expected: 2,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8
`,
                expected: 4,
            },
            {
                input: `
14-50,14-50
43-44,43-87
55-99,51-96
67-68,68-91
8-8,27-73
22-92,21-92
4-80,3-80
10-67,34-67
49-56,49-89
27-96,27-28
30-47,29-47
75-75,16-74
50-70,47-63
`,
                expected: 11,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
