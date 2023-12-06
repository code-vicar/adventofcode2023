import { open } from "node:fs/promises";

// seed-to-soil
// soil-to-fertilizer
// fertilizer-to-water
// water-to-light
// light-to-temperature
// temperature-to-humidity
// humidity-to-location
export interface IRoute {
    start: number;
    translation: number;
    range: number;
}

export interface IEdge {
    from: string;
    to: string;
    data: Array<{
        toIdx: number;
        fromIdx: number;
        range: number;
    }>;
}

export interface INode {
    name: string;
    adj: Array<{
        to: INode;
        routes: IRoute[];
    }>
}

export async function parseInput(filePath: string) {
    const file = await open(filePath);
    const lineReader = file.readLines();

    const lineIterator = lineReader[Symbol.asyncIterator]();
    const seedsInput: string = (await lineIterator.next()).value;

    const seedValues = seedsInput
        .replace("seeds:", "")
        .trim()
        .split(" ")
        .map((s) => parseInt(s, 10));

    const nodes: Map<string, INode> = new Map();
    const edges: IEdge[] = [];
    let edge: IEdge | undefined;

    for await (const line of lineIterator) {
        const mapHeader = line.match(/(.+)-to-(.+)\s+map/);
        if (mapHeader) {
            if (!nodes.has(mapHeader[1])) {
                nodes.set(mapHeader[1], {
                    name: mapHeader[1],
                    adj: []
                });
            }
            if (!nodes.has(mapHeader[2])) {
                nodes.set(mapHeader[2], {
                    name: mapHeader[2],
                    adj: []
                });
            }
            edge = {
                from: mapHeader[1],
                to: mapHeader[2],
                data: []
            };
            edges.push(edge);
            continue;
        }
        if (edge) {
            const routeInput = line;
            const trimmedInput = routeInput.trim();
            if (!trimmedInput) {
                continue;
            }
            const routeColumns = trimmedInput.split(" ").map(s => parseInt(s, 10));
            edge.data.push({
                fromIdx: routeColumns[1],
                toIdx: routeColumns[0],
                range: routeColumns[2]
            });
        }
    }

    for (const edge of edges) {
        const fromNode = nodes.get(edge.from);
        if (!fromNode) {
            continue;
        }
        const toNode = nodes.get(edge.to);
        if (!toNode) {
            continue;
        }
        // create bidirectional link
        fromNode.adj.push({
            to: toNode,
            routes: edge.data.map(d => ({
                range: d.range,
                start: d.fromIdx,
                translation: d.toIdx - d.fromIdx
            }))
        });
        toNode.adj.push({
            to: fromNode,
            routes: edge.data.map(d => ({
                range: d.range,
                start: d.toIdx,
                translation: d.fromIdx - d.toIdx
            }))
        });
    }

    return {
        seedValues,
        nodes
    };
}
