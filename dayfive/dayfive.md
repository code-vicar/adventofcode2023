# Day 5 solution

Created a graph with edges containing the value translation data to represent the connection between seeds and locations.
Values can be translated between nodes in the graph that are connected following the edges and the value according to the value translation rule associated with the edge.

The path between nodes is found by bfs iterative traversal of the graph, Starting with the initial node and stopping when/if the target node is found.
