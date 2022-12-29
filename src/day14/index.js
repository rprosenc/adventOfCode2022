import run from "aocrunner";
import chalk from 'chalk';

/*
console.log(String.fromCharCode(9617)); // ░
console.log(String.fromCharCode(9618)); // ▒
console.log(String.fromCharCode(9619)); // ▓
*/

const SAND = 'o';
const WALL = 'X'
const BLOCK1 = '░';
const BLOCK2 = '▒';
const BLOCK3 = '▓';


const parseInput = (rawInput) => rawInput.split('\n').map(line=>line.split(' -> ').map(p=>p.split(',').map(Number)));


const createMap = (input) => {
    const map = [];
    let curX, curY, prevX, prevY, left, right, top, bottom;
    for(let i=0; i<input.length; i++) {
        for(let j=1; j<input[i].length; j++) {
            curX = input[i][j][0];
            curY = input[i][j][1];
            prevX = input[i][j-1][0];
            prevY = input[i][j-1][1];
            left = Math.min(curX, prevX);
            right = Math.max(curX, prevX);
            top = Math.min(curY, prevY);
            bottom = Math.max(curY, prevY);
            let k = 0;
            for(let x=left; x<=right; x++) {
                for(let y=top; y<=bottom; y++) {
                    if (typeof map[y] === 'undefined') {
                        map[y] = [];
                    }
                    map[y][x] = WALL;
                }
            }
        }
    }
    if (typeof map[0] === 'undefined') {
        map[0] = [];
    }
    map[0][500] = '+';
    return map;
}

const isEmpty = (x, y, map) => {
    if (typeof map[y] === 'undefined') {
        return true;
    }

    if (map[y][x] === 'undefined') {
        return true;
    }

    if ([SAND, WALL].indexOf(map[y][x]) < 0) {
        return true;
    }

    return false;
}

// either return next coordinate or current, if no movement is possible
const moveBlock = (x,y, map) => {
    if (isEmpty(x, y+1, map)) {
        return [x, y+1];
    }

    if (isEmpty(x-1, y+1, map)) {
        return [x-1, y+1];
    }

    if (isEmpty(x+1, y+1, map)) {
        return [x+1, y+1];
    }

    return [x, y];
}

const printMap = (map, cutFloor) => {
    let minX=100000, minY=0, maxX=0, maxY=0;
    const floor = cutFloor ? map.length-1 : map.length;
    for(let y=0; y<floor; y++) {
        if (typeof map[y] === 'undefined') {
            map[y] = [];
        }
        for (let x=0; x<map[y].length-1; x++) {
            if (typeof map[y][x] !== 'undefined') {
                if (x<minX) {
                    minX = x;
                }
                if (x>maxX) {
                    maxX = x;
                }
                if (y>maxY) {
                    maxY = y;
                }
            }
        }
    }

    let lineBuffer;
    for (let y=minY; y<=maxY; y++) {
        lineBuffer = '';
        for (let x=minX-4; x<=maxX+4; x++) {
            if (typeof map[y][x] !== 'undefined') {
                if (map[y][x] === SAND) {
                    lineBuffer += chalk.yellow(BLOCK2);
                    continue;
                }
                if (map[y][x] === WALL) {
                    lineBuffer += chalk.bold(BLOCK3);
                    continue;
                }
                lineBuffer += map[y][x];
            } else {
                lineBuffer += chalk.rgb(50,50,50)(BLOCK1);
            }
        }
        console.log(lineBuffer);
    }
}


// one piece of sand
const flow = (map) => {
    // start position: 500/0
    let x=500, y=0, next = [];
    let placed = false;
    while (y <= map.length) {
        next = moveBlock(x, y, map); // moveBlock() always increments y or does not change the coordinates at all
        if (x!== next[0] || y!==next[1]) {
            x = next[0];
            y = next[1];
        } else {
            if (typeof(map[y]) === 'undefined') {
                map[y] = [];
            }
            if (x === 500 && y === 0) {
                break; // do NOT PLACE at start position
            }
            map[y][x] = SAND;
            placed = true;
            break;
        }
    }

    return placed;
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const map = createMap(input);
    let i = 0;
    while ( flow(map) ) {
        i++;
    }
    printMap(map);

    return i;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const map = createMap(input);
    const floor = map.length + 1;
    map[floor] = [];
    for(let i=0; i<10000; i++) {
        map[floor][i] = WALL;
    }
    console.log({floor});
    let i = 0;
    while ( flow(map) ) {
        i++;
    }
    printMap(map, true);

    return i+1;
};

run({
    part1: {
        tests: [
            {
                input: `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`,
                expected: 24,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9
`,
                expected: 93,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
