import { resolve } from "node:path"
// import { inspect } from "node:util";
import { INode, parseInput } from "./parseInput";

async function main() {
    // const { nodes, seeds } = await parseInput(resolve(__dirname, "./testInput.txt"));
    const { nodes, seedValues } = await parseInput(resolve(__dirname, "./input.txt"));

    const seedNode = nodes.get("seed");
    if (!seedNode) {
        return;
    }
    const translateTo = "location";
    const path: string[] = [];
    const toVisit: INode[] = [];
    seedNode?.adj.forEach(n => {
        toVisit.push(n.to);
    });
    const visited: Set<string> = new Set();
    while (toVisit.length) {
        const current = toVisit.pop();
        if (!current) {
            continue;
        }
        path.push(current.name);
        visited.add(current.name);
        if (current.name === translateTo) {
            // stop?
            break;
        }
        for (let next of current?.adj) {
            if (!visited.has(next.to.name)) {
                toVisit.push(next.to);
            }
        }
    }
    if (path[path.length - 1] === "location") {
        console.log("found path to location", path);
    } else {
        console.log("no path to location from seed");
    }

    let node = seedNode;
    let values = seedValues;
    for (let nodeName of path) {
        const nextNode = node.adj.find(adj => adj.to.name === nodeName);
        values = values.map(v => {
            const route = nextNode?.routes.find(r => {
                return v >= r.start && v < r.start + r.range
            });
            return v + (route?.translation || 0);
        })
        node = nextNode!.to;
    }
    console.log(values);
    console.log("answer", Math.min(...values))
}

main();
