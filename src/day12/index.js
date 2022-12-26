import run from "aocrunner";
import chalk from 'chalk';
import AStarFinder from 'pathfinding';

const parseInput = (rawInput) => rawInput.split('\n').map(l=>l.split(''));


const printMap = (input, visited, x, y) => {
    let line;
    console.log('')
    for(let i=0; i<visited.length; i++) {
        line = i + ' ';
        for(let j=0; j<visited[i].length; j++) {
            if (input[i][j] === 'E') {
                if (x===i && y===j) {
                    line += chalk.red.bold(' E');
                } else {
                    line += chalk.green.bold(' E');
                }
            } else if (x===i && y===j) {
                line += chalk.red.bold(' ' + input[i][j]);
            } else if (visited[i][j] === 1){
                line += chalk.white.bold(' ' + input[i][j]);
            } else {
                line += chalk.gray(' ' + input[i][j]);
            }
        }
        console.log(line);
    }
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    let found = false;

    const recurse = (x, y, depth, visited) => {
            // undisciplinned use of variables...
            visited[x][y] = 1;   // mark field, to never again step on it
            printMap(input, visited, x, y);

            const moves = possibleMoves[x][y];
            //console.log({x,y,depth, moves});
            let move;
            for (let i=0; i<moves.length; i++) {
                move = moves[i];
                //console.log('   move: ', move);
                if (!visited[ move.x ][ move.y ] && depth < 10000) {
                    if (map[move.x][move.y] === 26) {
                        found = true;
                        console.log('FOUND SHIT');
                        return depth+1;
                    }
                    if (!found) depth = recurse(move.x, move.y, depth+1, visited.map(line=>line.map(c=>c)));
                }
            }
            return depth;
    }

    const map = input.map(l=>{
        return l.map(c => {
            if (c === 'S') { return c; }
            if (c === 'E') { return 26; }
            return c.charCodeAt() - 'a'.charCodeAt();
            })
        })
    const possibleMoves = [];
    const visited = [];
    let p, n;
    const moves = [{x:-1, y:0}, {x:1, y:0}, {x:0, y:-1}, {x: 0, y:1}];
    let targets, end;
    for(let x = 0; x<map.length; x++) {
        possibleMoves.push([]); // list for y
        visited.push([]);
        for(let y = 0; y<map[x].length; y++) {
            possibleMoves[x].push([]); // list for x/y moves
            visited[x].push(0);
            p = map[x][y];
            if (p === 'S') {
                p = 0;
            }
            if (p === 'E') {
                p = 26;
            }

            targets = moves
                        .map(m=>{return {x: x+m.x, y: y+m.y, }})
                        .filter(m => m.x>=0 && m.x<map.length && m.y>=0 && m.y<map[m.x].length)
                        .map(m => { return {x: m.x, y: m.y, n: map[m.x][m.y], p}})
                        .filter(m => m.n <= m.p+1)
                        .sort((a,b)=>b.n-a.n);
            // check for end
            end = targets.filter(m=>map[m.x][m.y]===26);
            if (end.length) {
                end[0].n = 26;
                possibleMoves[x][y] = [end[0]];
            } else {
                possibleMoves[x][y] = targets;
            }
        }
    }
    return recurse(0,0,0, visited);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            /*
            {
                input: `
Saxqponm
xbcryxxl
xxcszExk
xxctuvwj
xxdefghi
`,
                expected: 31,
            },
            */
            {
                input: `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`,
                expected: 31,
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
