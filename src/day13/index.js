import run from "aocrunner";

const parseInput1 = (rawInput) => rawInput.split('\n\n').map(p=>p.split('\n').map(eval));
const parseInput2 = (rawInput) => rawInput.split('\n').filter(a=>a).map(str => {return {str, val:eval(str)}});

const cmp = (a,b) => {
    // If both values are integers, the lower integer should come first.
    if (typeof a === 'number' && typeof b === 'number') {
        if (a===b) {
            return null;
        }
        return a<b;
    }

    // compare two arrays
    if ((a instanceof Array) && (b instanceof Array)) {
        let tmp;
        for(let i=0; i<b.length; i++) {
            if (a.length <= i) {
                return true;   //  If the left list runs out of items first, the inputs are in the right order
            }

            // compare items one by one, end as soon as one pair is in or out of order
            tmp = cmp(a[i], b[i]);
            if (tmp !== null) {
                return tmp;
            }
        }
        if (a.length > b.length) {
            return false; // If the right list runs out of items first, the inputs are not in the right order
        }

        if (a.length === b.length) {
            return null;
        }

        return true;
    }

    // only one number - make array
    if (typeof a === 'number') {
        a = [a];
    }
    if (typeof b === 'number') {
        b = [b];
    }

    return cmp(a,b);
}

const part1 = (rawInput) => {
    const input = parseInput1(rawInput);
    const rightOrderIndices = input.map((p,i) => cmp(p[0],p[1])?i+1:0);

    return rightOrderIndices.reduce((a,v)=>a+v, 0);
};

const part2 = (rawInput) => {
    const input = parseInput2(rawInput + `
[[2]]
[[6]]`);

    input.sort((a,b) => cmp(a.val,b.val) ? -1 : 1);
    const sorted = input.map(p=>p.str);
    const divider1 = sorted.indexOf('[[2]]') + 1;
    const divider2 = sorted.indexOf('[[6]]') + 1;

    return divider1 * divider2;
};

run({
    part1: {
        tests: [
            {
                input: `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`,
                expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
`,
                expected: 140,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
