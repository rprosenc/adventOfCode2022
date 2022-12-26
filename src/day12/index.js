import run from "aocrunner";
import chalk from 'chalk';
import Graph from "node-dijkstra";

const parseInput = (rawInput) => rawInput.split('\n').map(l=>l.split(''));


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const graph = new Graph();
    const map = input.map(l=>{
    return l.map(c => {
        if (c === 'S') { return 0; }    // regular fields start at 1
        if (c === 'E') { return 27; }   // regular fields go up to 26
        return 1 + c.charCodeAt() - 'a'.charCodeAt();  // 'a'-> 97, 'z'->122, a-a=0, z-a = 25
        })
    })

    //const finder = new AStarFinder();

    let start = '0_0';
    let end = '0_0';
    let neighbours, nx, ny;
    const neighbourVectors = [
        {x:-1, y:0},
        {x:+1, y:0},
        {x:0, y:-1},
        {x:0, y:+1},
    ];
    for(let x=0; x<input.length; x++) {
        for(let y=0; y<input[x].length; y++) {
            // find start and end coordinates
            if (input[x][y] === 'S') {
                start = `${x}_${y}`;
            } else if (input[x][y] === 'E') {
                end = `${x}_${y}`;
            }
            // build graph. all neighbours will have the same weight, but graph is directed
            neighbours = {};

            neighbourVectors.forEach(v => {
                const nx = x+v.x;
                const ny = y+v.y;
                // handle only valid coordinates
                if (nx>=0 && ny>=0 && nx<input.length && ny<input[x].length) {
                    if (map[nx][ny] - map[x][y] <= 1) {
                        neighbours[`${nx}_${ny}`] = 1;
                    }
                }
            });
            graph.addNode(`${x}_${y}`, neighbours);
        }
    }
    const path = graph.path(start, end, {cost: true});

    return path.cost;
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
    onlyTests: 0,
});
