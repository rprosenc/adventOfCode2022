import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n\n');

class Monkey {
    constructor(items, op, divisible, testTrueMonkey, testFalseMonkey) {
        this.items = items;
        this.op = op;
        this.divisible = divisible;
        this.testTrueMonkey = testTrueMonkey;
        this.testFalseMonkey = testFalseMonkey;

        this.monkeys = [];
        this.inspections = 0;
    }

    setMonkeys(monkeys) {
        this.monkeys = monkeys;
     }

    throw(item, monkey) {
        if (monkey >=0 && monkey < this.monkeys.length) {
            this.monkeys[monkey].items.push(item);
        }
    }

    inspect(item) {
        this.inspections++;
        const factor = this.op[1]==='old' ? item : Number(this.op[1]);
        if (this.op[0] === '+') { item += factor }
        if (this.op[0] === '*') { item *= factor }
        return Math.floor(item/3);
    }

    test(item) {
        return item % this.divisible === 0;
    }

    turn() {
        let item, testTrue;
        while (this.items.length) {
            item = this.items.shift();
            item = this.inspect(item);
            if (this.test(item)) {
                this.throw(item, this.testTrueMonkey);
            } else {
                this.throw(item, this.testFalseMonkey);
            }
        }
    }
}

const createMonkey = (config) => {
    const lines = config.split('\n').map(l=>l.trim());
    const items = lines[1].split(' ').slice(2).map(n=>n.replace(',','')).map(Number);
    const op = lines[2].replace('Operation: new = old ','').split(' ');
    const divisible= Number(lines[3].split(' ').pop());
    const testTrue = Number(lines[4].split(' ').pop());
    const testFalse = Number(lines[5].split(' ').pop());
    return new Monkey(items, op, divisible, testTrue, testFalse);
}

const createMonkeys = (input) => {
    const monkeys = [];
    for (let i=0; i < input.length; i++) {
        monkeys.push(createMonkey(input[i]));
    }
    monkeys.forEach(m=>m.setMonkeys(monkeys));
    return monkeys;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const monkeys = createMonkeys(input);

    for(let i=0; i<20; i++) {
        monkeys.forEach(m=>m.turn());
    }

    monkeys.sort((a,b)=>b.inspections-a.inspections);
    const inspections = monkeys.map(m=>m.inspections)
    return inspections[0] * inspections[1];
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
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
`,
                expected: 10605,
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
