import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n\n');


let parseStacks = (input) => {
    const lines = input.split('\n');
    lines.reverse();
    const stacks = [[], [], [], [], [], [], [], [], []];
    const positions = [1, 5, 9, 13, 17, 21, 25, 29, 33];

    for (let l=1; l<lines.length; l++) {
        let line = lines[l];
        for(let i=0; i<9; i++) {
            let crate = line[positions[i]]
            crate = crate ? crate.trim() : undefined;
            if (crate) {
                stacks[i].push(crate);
            }
        }
    }
    return stacks;
}

let parseCommands = (input) => input
                        .split('\n')
                        .map(c => c.replace('move ', '')
                                    .replace('from ', '')
                                    .replace('to ', '')
                                    .split(' ')
                                    .map(Number)
                        );

let processStacks9000 = (stacks, commands) => {
    commands.forEach(c => {
        let [rep, from, to] = c;
        for(let i=0; i<rep; i++) {
            stacks[to-1].push(stacks[from-1].pop());
        }
    });
    return stacks;
}

let processStacks9001 = (stacks, commands) => {
    commands.forEach(c => {
        let [rep, from, to] = c;
        let src = from-1;
        let target = to-1;
        let moved = stacks[src].slice(stacks[src].length - rep, stacks[src].length);
        moved.map(c=>{
            stacks[src].pop();
            stacks[target].push(c);
        });
    });
    return stacks;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const stacks = parseStacks(input[0]);
    let commands = parseCommands(input[1])
    const processedStacks = processStacks9000(stacks, commands);
    return processedStacks.filter(s=>s.length).map(s=>s.pop()).join('');
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const stacks = parseStacks(input[0]);
    let commands = parseCommands(input[1])
    const processedStacks = processStacks9001(stacks, commands);
    return processedStacks.filter(s=>s.length).map(s=>s.pop()).join('');
};

run({
    part1: {
        tests: [
            {
                input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
                expected: "CMZ",
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`,
                expected: "MCD",
            },
        ],
        solution: part2,
    },
    trimTestInputs: false,
    onlyTests: 0,
});
