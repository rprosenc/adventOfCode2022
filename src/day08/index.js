import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(l=>l.split(''));

const toYX = input=> {
    const yx = [];
    for (let y=0; y<input[0].length; y++) {
        yx[y] = [];
    }
    for (let x=0; x<input.length; x++) {
        for (let y=0; y<input[x].length; y++) {
            yx[y][x] = input[x][y];
        }
    }

    return yx;
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    //console.log(input);
    let visible = (2 * input.length) + (2 * (input[0].length-2));
    let up, down, left, right, treeIsVisible;
    let hiddenUp, hiddenDown, hiddenLeft, hiddenRight;
    for (let x=1; x<input.length-1; x++) {
        for (let y=1; y<input[x].length-1; y++) {
            //console.log('look at', input[x][y], 'at', x+'/'+y);
            let tree = input[x][y];
            let treeIsVisible = true;
            let up = x, down = x, left = y, right = y;
            hiddenUp = false;
            while (!hiddenUp && up>0) {
                up--;
                //console.log('  test up', input[up][y], 'at', up, y)
                hiddenUp = input[x][y] <= input[up][y];
            }
            if (!hiddenUp) {
                visible++;
                //console.log('  set visible to ', visible);
                continue;
            }

            hiddenDown = false;
            while (!hiddenDown && down<input.length-1) {
                down++;
                //console.log('  test down', input[down][y], 'at', down, y)
                hiddenDown = input[x][y] <= input[down][y];
            }
            if (!hiddenDown) {
                visible++;
                //console.log('  set visible to ', visible);
                continue;
            }

            hiddenLeft = false;
            while (!hiddenLeft && left>0) {
                left--;
                //console.log('  test left', input[x][left], 'at', x, left)
                hiddenLeft = input[x][y] <= input[x][left];
            }
            if (!hiddenLeft) {
                visible++;
                //console.log('  set visible to ', visible);
                continue;
            }

            hiddenRight = false;
            while (!hiddenRight && right<input[x].length-1) {
                right++;
                //console.log('  test right', input[x][right], 'at', x, right)
                hiddenRight = input[x][y] <= input[x][right];
            }
            if (!hiddenRight) {
                visible++;
                //console.log('  set visible to ', visible);
                continue;
            }

        }
    }
    return visible;
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
`,
                expected: "",
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
