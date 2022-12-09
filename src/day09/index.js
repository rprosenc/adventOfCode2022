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

    pull(other) {
        if (!other) {
            return;
        }
        if (this.adjacentTo(other)) {
            return;
        }

        if (this.x === other.x) {
            // vertical move
            if (this.y > other.y) other.y++
            if (this.y < other.y) other.y--;
        } else if (this.y === other.y) {
            // horizontal move
            if (this.x > other.x) other.x++
            if (this.x < other.x) other.x--
        } else {
            // diagonal move (only 4 possible moves, only one brings to adjacent position)
            if (this.x > other.x) {
                other.x++;
            } else {
                other.x--;
            }
            if (this.y > other.y) {
                other.y++;
            } else {
                other.y--;
            }
        }
        other.update();

    }

    update() {
        this.visit();
        this.pull(this.linked);
    } 

    U() { 
        this.y++;
        this.update();
    } 
 
    D() { 
        this.y--;
        this.update();
    }
 
    R() { 
        this.x++;
        this.update();
    }
 
    L() { 
        this.x--;
        this.update();
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
    //vectors.reverse().forEach(v=>v.log());
    console.log('')
}


const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const head = new Vector('H'), tail = new Vector('T');
    head.link(tail);
    //paint([tail, head], 6, 'start');
    for(let i=0; i<input.length; i++) {
        head.move(input[i]);
        //paint([tail, head], 6, input[i]);
    }
    return tail.visited.length;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    const head = new Vector('H');
    const t1 = new Vector('1');
    const t2 = new Vector('2');
    const t3 = new Vector('3');
    const t4 = new Vector('4');
    const t5 = new Vector('5');
    const t6 = new Vector('6');
    const t7 = new Vector('7');
    const t8 = new Vector('8');
    const t9 = new Vector('9');

    head.link(t1);
    t1.link(t2);
    t2.link(t3);
    t3.link(t4);
    t4.link(t5);
    t5.link(t6);
    t6.link(t7);
    t7.link(t8);
    t8.link(t9);
    //paint([t9, t8, t7, t6, t5, t4, t3, t2, t1, head], 6, 'start');
    for(let i=0; i<input.length; i++) {
        head.move(input[i]);
        //paint([t9, t8, t7, t6, t5, t4, t3, t2, t1, head], 6, input[i]);
    }
    return t9.visited.length;
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
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`,
                expected: 1,
            },
            {
                input: `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
`,
                expected: 36,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
