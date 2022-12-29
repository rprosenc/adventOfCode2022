import run from "aocrunner";

// array of sensor/beacon coordinate pairs
const parseInput = (rawInput) => rawInput.split('\n').map(l=>
        l.replace('Sensor at x=', '')
         .replace(', y=',',')
         .replace(': closest beacon is at x=',':')
    .replace(', y=',',').split(':').map(c=>c.split(',').map(Number))
);


const taxi = (a, b) => {
    return Math.abs(a[0]-b[0]) + Math.abs(a[1]-b[1]);
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const target = 2000000;
    let s, b, d, shift=[],  sensors = [];

    const matching = [];
    // looking for line 10
    for(let i=0; i<input.length; i++) {
        s = input[i][0];
        b = input[i][1];
        d = taxi(s, b);
        shift.push(s[0]-d);
        if (s[1]+d < target || s[1]-d > target) {
            continue;
        } else {
            matching.push({s,b,d});
        }
    }

    const shiftBy = Math.min.apply(null, shift);
    const targetLine = [];
    console.log(matching);

    let v;
    for(let i=0; i<matching.length; i++) {
        s = matching[i].s;
        b = matching[i].b
        d = matching[i].d
        v = Math.abs(s[1] - target); // vertical distance to my line
        // mark empty places
        for (let j=s[0]-(d-v); j<=s[0]+(d-v); j++) {
            if (typeof targetLine[j-shiftBy] === 'undefined') {
                targetLine[j-shiftBy] = '#';
            }
        }
        if (b[1] === target) {
            targetLine[b[0]-shiftBy] = 'B'
        }
    }

    return targetLine.filter(i=>i==='#').length;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            {
                input: `
Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3
`,
                expected: 26,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
`,
                expected: "",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 1,
});
