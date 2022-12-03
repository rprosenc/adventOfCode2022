import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n').map(l => l.split(''));

const lowerCase = Array.from(Array(26)).map((e, i) => i + 97).map((x) => String.fromCharCode(x)).join('');
const upperCase = Array.from(Array(26)).map((e, i) => i + 65).map((x) => String.fromCharCode(x)).join('');
const priorityMap = ' ' + lowerCase + upperCase;

const getIntersection = packs => {
    let intersection = packs[0];
    for(let i=1; i<packs.length; i++) {
        intersection = intersection.filter(c => packs[i].includes(c));
    }
    
    // there is always only one type / badge in both compartments / group of backpacks - also 'abc'.indexOf(['b']) still works fine
    return [...new Set(intersection)]; 
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const backpacks = input.map(backpack => {
        const center = backpack.length/2;
        const left = backpack.slice(0, center).sort();
        const right = backpack.slice(center).sort();
        return [left, right];
    }); 

    return backpacks.reduce((acc,backpack) => {
        return acc + priorityMap.indexOf(getIntersection(backpack));
    }, 0);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const groups = [];
    const groupSize = 3;
    for (let i = 0; i < input.length; i += groupSize) {
        const group = input.slice(i, i + groupSize);
        groups.push(group);
    }

    return groups.reduce((acc,group) => {
        return acc + priorityMap.indexOf(getIntersection(group));
    }, 0);
};

run({
    part1: {
        tests: [
            {
                input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
                expected: 157
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`,
                expected: 70,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
