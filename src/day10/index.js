import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    let regX = 1;
    let cycle = 1;
    const processingQueue = [];
    const sigStrengths = []
    const checkPoints = [20, 60, 100, 140, 180, 220];
    let cmd, val, foo;
    while(processingQueue.length || input.length) {
        cmd = '    '; val = 0;
        // count sigStrength at the beginning of a cycle!
        if (checkPoints.includes(cycle)) {
            sigStrengths.push(cycle*regX);
        }

        if (processingQueue.length > 0) {
            regX += processingQueue.pop();
        } else if (input.length) {
            foo = input.shift().split(' ');
            cmd = foo[0];
            if (foo.length>1) {
                val = Number(foo[1])
            }
        }
        if (cmd === 'noop') {
            // do nothing
        }
        if (cmd === 'addx') {
            processingQueue.unshift(Number(val));
        }

        cycle++;
    }

    return sigStrengths.reduce((acc,val)=>acc+val, 0);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    let regX = 1;
    let cycle = 1;
    const processingQueue = [];
    const sigStrengths = []
    let crt = [];
    let cmd, val, foo, line, pos, sprite;
    while(processingQueue.length || input.length) {
        cmd = '    '; val = 0;

        // print at screen
        pos = crt.length % 40;
        sprite = [regX-1, regX, regX+1];
        crt.push( (sprite.includes(pos)) ? 1 : 0 );
        

        if (processingQueue.length > 0) {
            regX += processingQueue.pop();
        } else if (input.length) {
            foo = input.shift().split(' ');
            cmd = foo[0];
            if (foo.length>1) {
                val = Number(foo[1])
            }
        }
        if (cmd === 'noop') {
            // do nothing
        }
        if (cmd === 'addx') {
            processingQueue.unshift(Number(val));
        }

        if (cycle>=40) {
            //break;
        }

        cycle++;
    }

    // small display
    let buffer = [];
    let c, j, x;
    for(let x=0; x<6; x+=2) {
        buffer.push(x + ' ');
        for (let i=0; i<40; i++) {
            c = ' ';
            j = x*40 + i; 
            if (crt[j] && crt[j+40]) c ='█';
            if (!crt[j] && crt[j+40]) c ='▄';
            if (!crt[j] && !crt[j+40]) c =' ';
            if (crt[j] && !crt[j+40]) c ='▀';
            buffer[buffer.length-1] += c;
        }
    }
    console.log(buffer);

    // simple large display
    buffer = [];
    for(let i=0; i<=239; i++) {
        if (i%40 === 0) {
            c = '';
            if (i<10) c+='0';
            if (i<100) c+='0';
            buffer.push(c + i + ' ');
        }
        buffer[buffer.length-1] += crt[i] ? '██' : '  ';
    }

    console.log(buffer);

    return 'RKPJBPLA'
};

run({
    part1: {
        tests: [
            {
                input: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`,
                expected: 13140,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop
`,
                expected: 'test1',
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
