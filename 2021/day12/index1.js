import fs from "fs";

const data = fs.readFileSync("data-extra-small.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var connections = lines.reduce((acc, curr) => {
  var [first, second] = curr.split("-");
  acc[first] = acc[first] != undefined ? [...acc[first], second] : [second];
  acc[second] = acc[second] != undefined ? [...acc[second], first] : [first];
  return acc;
}, {});

connections = Object.entries(connections).reduce((acc, [key, value]) => {
  acc[key] = value.filter((x) => x != "start");
  return acc;
}, {});

var startRoutes = connections["start"].map((c) => ["start", c]);

var expand = (routes, connections, i) => {
  var nextRoutes = [];

  for (const route of routes) {
    var lastNode = route[route.length - 1];

    var lastNodeLowerCaseCount = route
      .filter((x) => x == lastNode && lastNode.toLowerCase() == lastNode)
      .reduce((acc, _curr) => acc + 1, 0);

    if (lastNode == "end") {
      nextRoutes.push(route);
    } else if (lastNodeLowerCaseCount > 1) {
    } else {
      var nextNodes = connections[lastNode];
      nextRoutes.push(...nextNodes.map((nextNode) => [...route, nextNode]));
    }
  }

  if (nextRoutes.every((route) => route[route.length - 1] == "end")) {
    return nextRoutes;
  } else {
    return expand(nextRoutes, connections, i + 1);
  }
};

var endRoutes = expand(startRoutes, connections, 0);

console.log(endRoutes);
console.log(endRoutes.length);
