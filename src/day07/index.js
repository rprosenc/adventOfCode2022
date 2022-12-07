import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split('\n');


class Directory {
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.children = [];
    }

    getName() {
        return this.name;
    }

    getSize() {
        return this.children.reduce((acc,val) => acc+val.getSize(), 0);
    }

    getUp() {
        return this.parent ? this.parent : this;
    }

    getDirectory(name) {
        const dirs = this.getDirectories();
        for(let i=0; i<dirs.length; i++) {
            if (dirs[i].getName() === name) {
                return dirs[i];
            }
        }
        throw new Error('child not found: ' + name);
    }

    getTop() {
        return this.parent? this.parent.getTop() : this;
    }

    addChild(child) {
        if (this.children.filter(c=>c.name===child.name).length) return;
        this.children.push(child);
    }

    getDirectories() {
        const dirs = [];
        for(let i=0; i<this.children.length; i++) {
            let child = this.children[i];
            if (child instanceof File) continue;
            dirs.push(this.children[i]);
        }

        return dirs;
    }

    getDirectoriesBelow(threshold) {
        let result = [];
        const dirs = this.getDirectories();
        //console.log(dirs.map(d=>d.name));
        for(let i=0; i<dirs.length; i++) {
            let dir = dirs[i];
            if (dir.getSize() <= threshold) {
                result.push(dir);
            }
            result = result.concat(dir.getDirectoriesBelow(threshold))
        }
        return result;
    }

    tree(depth) {
        let indent = '';
        while(indent.length < depth) {
            indent += '   ';
        }
        console.log(indent + '['+this.name+'] (' + this.getSize() + ')');
        this.children.forEach(c=>c.tree(depth+1));
    }
}


class File {
    constructor(name, size, parent) {
        this.name = name;
        this.size = size;
        this.parent = parent;
    }

    getSize() {
        return this.size;
    }
    tree(depth) {
        let indent = '';
        while(indent.length < depth) {
            indent += '   ';
        }
        console.log(indent + this.name + ' (' + this.size + ')');
    }
}

const createFs = (input) => {
    const top = new Directory('/', null)
    let dir = top;
    for(let i=0; i<input.length; i++) {
        let line = input[i];
        const args = line.split(' ');
        switch (args[0]) {
            case '$':  // got a command
                let command = args[1]
                switch (command) {
                    case 'cd': 
                        const path = args[2];
                        if (path === '/') {
                            dir = dir.getTop();
                            break;
                        }
                        if (path === '..') {
                            dir = dir.getUp();
                            break;
                        }
                        dir = dir.getDirectory(path)
                        break;
                    case 'ls': 
                        break;
                }
                break;
            case 'dir':  // got a listed directory
                dir.addChild(new Directory(args[1], dir));
                break;
            default:     // got a listed file
                dir.addChild(new File(args[1], parseInt(args[0]), dir));
                break;
        }
    }
    return top;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const fs = createFs(input);

    return fs.getDirectoriesBelow(100000).reduce((acc, val)=>acc+val.getSize(), 0);

    return;
};

const part2 = (rawInput) => {
    console.log('\n\n')
    const input = parseInput(rawInput);
    const fs = createFs(input);
    const totalSize = fs.getSize();
    const maxSize = 70000000;
    const requiredSize = 30000000;
    const unused = maxSize-totalSize;
    const toDelete = requiredSize-unused;
    console.log('total: ' + totalSize, 'delete: ' + toDelete);

    const dirs = fs.getDirectoriesBelow(maxSize).map(d=>d.getSize()).sort((a,b) => a-b);
    for(let i=0; i<dirs.length;i++) {
        if (dirs[i] > toDelete) {
            return dirs[i];
        }
    }

    return;
};

run({
    part1: {
        tests: [
            {
                input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
                expected: 95437,
            },
            {
                input: `
$ cd /
$ ls
165965 cmwllbzl.jlm
68612 ggb.qgd
dir gwnwqcgq
dir pdlpwdp
211084 qgcn.rbj
dir sbps
179881 sdpjprfb.lsh
318082 tdhgd.lwf
dir wvdlv
$ cd gwnwqcgq
$ ls
dir btddw
310195 cqsblt.jwb
dir ggb
dir hhdfbj
dir hrj
dir mdhln
dir nwbndtgl
dir pjmc
dir rgb
dir sdpjprfb
169518 tbswl.btw
$ cd btddw
$ ls
315327 hjs.dcw
dir pjmc
99361 pmqmgjsw.rqn
$ cd pjmc
$ ls
227980 cfbfmprt
dir hml
310835 mmcrfwdr.sps
170798 rhgmnqz
dir sdpjprfb
178337 vphwlqqw.dlt
dir wnmh
dir zqcnhs`,
                expected: 0,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`,
                expected: 24933642,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: 0,
});
