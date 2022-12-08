import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(l=>l.split(''));

const getVerticalRay = (map, x, y, dir) => {
    const ray = [];
    let X = x;
    while (X > 0 && X < map.length-1) {
        X += dir;
        ray.push(map[X][y]);
        if (map[X][y] >= map[x][y]) {
            break;
        }
    }
    return ray;
}
const getHorizontalRay = (map, x, y, dir) => {
    const ray = [];
    let Y = y;
    while (Y > 0 && Y < map[x].length-1) {
        Y += dir;
        ray.push(map[x][Y]);
        if (map[x][Y] >= map[x][y]) {
            break;
        }
    }
    return ray;
}

const getRays = (map, x, y) => {
    return {
        up: getVerticalRay(map, x, y, -1),
        right: getHorizontalRay(map, x, y, +1),
        down: getVerticalRay(map, x, y, +1),
        left: getHorizontalRay(map, x, y, -1),
    }
}

const isVisible = (map, x, y) => {
    const rays = getRays(map, x, y);
    const tree = map[x][y];
    const reverse = (a,b) => b-a;
    // tree is bigger than the biggest one in at least one direction
    return tree > rays.up.sort(reverse)[0] ||
           tree > rays.right.sort(reverse)[0] ||
           tree > rays.down.sort(reverse)[0] ||
           tree > rays.left.sort(reverse)[0]
}


const part1 = (rawInput) => {
    const map = parseInput(rawInput);

    let visible = (2 * map.length) + (2 * (map[0].length-2));
    for (let x=1; x<map.length-1; x++) {
        for (let y=1; y<map[x].length-1; y++) {
            if (isVisible(map, x, y)) {
                visible++;
            }
        }
    }

    return visible;
}
const part2 = (rawInput) => {
    const map = parseInput(rawInput);

    let highestScore = 0, currentScore = 0;
    let rays;
    for (let x=0; x<map.length; x++) {
        for (let y=0; y<map[x].length; y++) {
            rays = getRays(map, x, y);
            currentScore = rays.up.length 
                           * rays.right.length 
                           * rays.down.length
                           * rays.left.length;
            highestScore = Math.max(currentScore, highestScore);
        }
    }

    return highestScore;
};

run({
    part1: {
        tests: [
            {
                input: `
30373
25512
65332
33549
35390
`,
                expected: 21,
            },
            {
                input: `
303
255
653
335
353
`,
                expected: 14,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
30373
25512
65332
33549
35390
`,
                expected: 8,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
