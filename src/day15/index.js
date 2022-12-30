import run from "aocrunner";

// switch here to change constants for test or real input
const testMode = false;

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

const sensors = (input) => {
    let s, b, d;

    const result = [];
    // looking for line 10
    for(let i=0; i<input.length; i++) {
        s = input[i][0];
        b = input[i][1];
        d = taxi(s, b);
        result.push({s,b,d});
    }

    return result;
}

const buildTargetLine = (matching, target, xMin, xMax, shiftBy) => {
    const targetLine = [];
    let s, b, d, v;

    for(let i=0; i<matching.length; i++) {
        s = matching[i].s;
        b = matching[i].b
        d = matching[i].d
        v = Math.abs(s[1] - target); // vertical distance to my line
        // mark empty places
        for (let j=Math.max(xMin, s[0]-(d-v)); j<=Math.min(xMax, s[0]+(d-v)); j++) {
            if (typeof targetLine[j-shiftBy] === 'undefined') {
                targetLine[j-shiftBy] = j;//'#';
            }
        }
        if (s[1] === target) {
            targetLine[b[0]-shiftBy] = 'S'
        }
        if (b[1] === target) {
            targetLine[b[0]-shiftBy] = 'B'
        }
    }

    return targetLine;
}

const part1 = (rawInput) => {
    const input = sensors(parseInput(rawInput));
    const target = testMode ? 10 : 2000000;
    let s, b, d, v;

    const shiftBy = Math.min.apply(null, input.map(n=>n.s[0]-n.b[0]));
    const targetLine = buildTargetLine(input, target, -10000000, 10000000, shiftBy);

    return targetLine.filter(i=>typeof i === 'number').length;
};

const undef = el => typeof el === 'undefined';

const overlaps = (a,b) => {
    return (a[0]<=b[0] && a[1]>=b[0]) // a overlaps at least on left part with b
        || (a[0]<=b[1] && a[1]>=b[1]) // a overlaps at least on on right part with b
        || (a[0]>=b[0] && a[1]<=b[1]) // a is inside b
}
const neighbours = (a,b) => {
    return (a[1]+1 === b[0]) ||     // a directly left to b
        (b[1]+1 === a[0])           // a directly right to b
}

const sortRanges = (a,b) => {
    if (a[0] === b[0]) {
        return a[1] - b[1];
    }
    return a[0] - b[0];
}

// grow ranges that overlap with r
const reduceRanges = (ranges) => {
    ranges.sort(sortRanges);
    let left, right;
    for(let i=ranges.length-1; i>0; i--) {
        left = ranges[i-1];
        right = ranges[i];
        if (overlaps(left, right) || neighbours(left, right)) {
            // grow left
            ranges[i-1] = [Math.min(left[0], right[0]), Math.max(left[1], right[1])];
            // remove right
            ranges.splice(i, 1);
        }
    }
}

const buildRangesForLine = (sensors, target) => {
    const ranges = [];
    let s, b, d, v, dh;
    let left, right;

    for(let i=0; i<sensors.length; i++) {
        s = sensors[i].s;
        b = sensors[i].b
        d = sensors[i].d; //Math.abs(sensors[i].d - v);
        v = Math.abs(s[1] - target); // vertical distance to my line
        dh = Math.abs(d - v);

        // ranges are ALWAYS SORTED - this is usefull later
        if (s[1]-d <= target && s[1]+d >= target) {
            left = Math.max(0, s[0]-dh);
            right = Math.min(4000000, s[0]+dh);
            //ranges.push([s[0]-dh, s[0]+dh]);
            ranges.push([left, right]);
        }
        if (b[1] === target && b[0]>=0 && b[0]<=4000000) {
            ranges.push([b[0], b[0]]); // hardcode for convenience
        }
    }


    return ranges;
}

const findHole = ranges=> {
    for(let i=1; i<ranges.length; i++) {
        if (ranges[i][0]-ranges[i-1][1] === 2) {
            return ranges[i][0]-1;
        }
    }

    return false;
}

const tuningFrequence = (x, y) => {
    return x * 4000000 + y;
}

const part2 = (rawInput) => {
    const input = sensors(parseInput(rawInput));
    const maxCoord = testMode ? 20 : 4000000;
    let s, b, d, v;
    let ranges = [];

    let x;
    for(let y=0; y<maxCoord; y++) {
        ranges = buildRangesForLine(input, y);
        reduceRanges(ranges);
        reduceRanges(ranges);
        if (ranges.length>1) {
            x = findHole(ranges);
            if (x) {
                return tuningFrequence(x, y);
            }
        }
    }

    return null;
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
                expected: 56000011,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: testMode,
});
