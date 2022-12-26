import run from "aocrunner";
import chalk from 'chalk';
import Graph from "node-dijkstra";

const parseInput = (rawInput) => rawInput.split('\n').map(l=>l.split(''));


const createGraph = (input) => {
    const graph = new Graph();
    const map = input.map(l=>{
    return l.map(c => {
        if (c === 'S') { return 0; }    // regular fields start at 0
        if (c === 'E') { return 26; }   // regular fields go up to 25
        return c.charCodeAt() - 'a'.charCodeAt();  // 'a'-> 97, 'z'->122, a-a=0, z-a = 25
        })
    })

    //const finder = new AStarFinder();

    let neighbours, nx, ny;
    const neighbourVectors = [
        {x:-1, y:0},
        {x:+1, y:0},
        {x:0, y:-1},
        {x:0, y:+1},
    ];
    for(let x=0; x<input.length; x++) {
        for(let y=0; y<input[x].length; y++) {
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
    return graph;
}

const findNodes = (input, n) => {
    const result = [];
    for(let x=0; x<input.length; x++) {
        for(let y=0; y<input[x].length; y++) {
            // find start and end coordinates
            if (input[x][y] === n) {
                result.push(`${x}_${y}`);
            }
        }
    }
    return result;
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const graph = createGraph(input);
    const start = findNodes(input, 'S')[0];
    const end = findNodes(input, 'E')[0];
    const path = graph.path(start, end, {cost: true});

    return path.cost;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const graph = createGraph(input);
    const end = findNodes(input, 'E')[0];
    const start = findNodes(input, 'S')[0];
    const aNodes = findNodes(input, 'a');
    aNodes.push(start);
    const stepsPerPath = [];
    aNodes.forEach(n => {
        const path = graph.path(n, end, {cost:true});
        if (path.cost > 0) {
            stepsPerPath.push(path.cost);
        }
    })

    stepsPerPath.sort((a,b) => a-b);
    return stepsPerPath[0];
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
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`,
                expected: 29,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
