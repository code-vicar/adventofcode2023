# Day 5 solution

Created a graph with edges containing the value translation data to represent the connection between seeds and locations.
Values can be translated between nodes in the graph that are connected by following the edges, and adjusting the value according to the translation rule associated with each edge.

The path between nodes is found by bfs iterative traversal of the graph, Starting with the initial node and stopping when/if the target node is found.
