import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

class Vector {
    constructor(name) {
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.linked = null;
        this.visited = [];
        this.visit();
    }

    adjacentTo(other) {
        return other.x >= this.x-1 && other.x <= this.x+1
            && other.y >= this.y-1 && other.y <= this.y+1;
    }

    link(other) {
        this.linked = other;
    }

    visit() {
        const p = this.x+'/'+this.y;
        if (this.visited.indexOf(p)<0) {
            this.visited.push(p);
        }
    }

    U() { 
        this.y++;
        this.visit()
        if (this.linked && !this.adjacentTo(this.linked)) {
            this.linked.y = this.y-1;
            if (this.linked.x !== this.x) {
                this.linked.x = this.x;
            }
            this.linked.visit();
        }
    } 
 
    D() { 
        this.y--;
        this.visit()
        if (this.linked && !this.adjacentTo(this.linked)) {
            this.linked.y = this.y+1;
            if (this.linked.x !== this.x) {
                this.linked.x = this.x;
            }
            this.linked.visit();
        }
    }
 
    R() { 
        this.x++;
        this.visit()
        if (this.linked && !this.adjacentTo(this.linked)) {
            this.linked.x = this.x-1;
            if (this.linked.y !== this.y) {
                this.linked.y = this.y;
            }
            this.linked.visit();
        }
    }
 
    L() { 
        this.x--;
        this.visit()
        if (this.linked && !this.adjacentTo(this.linked)) {
            this.linked.x = this.x+1;
            if (this.linked.y !== this.y) {
                this.linked.y = this.y;
            }
            this.linked.visit();
        }
    }

    move(cmd) {
       const [d,s] = cmd.split(' ');
       let steps = Number(s);
       while(steps > 0) {
           this[d]();
           steps--;
       }
    }
 
    log() {
        console.log({name: this.name, x: this.x, y: this.y});
    }

    isAt(x,y) {
        return this.x===x && this.y===y;
    }
}

const paint = (vectors, dimension, label) => {
    let line;
    if (label) console.log(label);
    for(let y=dimension-1; y>=0; y--) {
        line = [];
        for(let x=0; x<dimension; x++) {
            line[x] = '.';
            vectors.forEach(v=>{if (v.isAt(x,y)) line[x] = v.name})
        }
        console.log(line.join(''));
    }
    vectors.reverse().forEach(v=>v.log());
    console.log('')
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    let head = new Vector('H'), tail = new Vector('T');
    head.link(tail);
    paint([tail, head], 6, 'start');
    for(let i=0; i<input.length; i++) {
        head.move(input[i]);
        paint([tail, head], 6, 'start');
    }
    return tail.visited.length;
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
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`,
                expected: 13,
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
