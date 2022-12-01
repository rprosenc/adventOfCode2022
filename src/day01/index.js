import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const getSortedCalories = (input) => {
  let elves = [0];
  input.forEach((val) => {
      if (val==='') { elves.push(0)}
      else {elves[elves.length-1] += parseInt(val)}
  })
  elves.sort((a,b) => b - a);

  return elves;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = getSortedCalories(input);
  return elves[0];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const elves = getSortedCalories(input);
  return elves[0] + elves[1] +elves[2];
};

run({
  part1: {
    tests: [
       {
         input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
         expected: 24000
       },
    ],
    solution: part1,
  },
  part2: {
    tests: [
       {
         input: `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`,
         expected: 45000,
       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
