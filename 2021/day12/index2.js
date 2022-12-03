import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
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

var expand = (routes) => {
  var nextRoutes = [];

  for (const route of routes) {
    var lastNode = route[route.length - 1];

    var nodeCounts = route.reduce((acc, curr) => {
      if (curr == curr.toLowerCase() && curr != "start" && curr != "end") {
        acc[curr] = (acc[curr] || 0) + 1;
      }
      return acc;
    }, {});
    var lowerCaseCounts = Object.values(nodeCounts).sort((a, b) => b - a);

    if (lowerCaseCounts[0] > 2 || lowerCaseCounts[1] > 1) {
      // ignore
    } else if (lastNode == "end") {
      nextRoutes.push(route);
    } else {
      var nextNodes = connections[lastNode];
      nextRoutes.push(...nextNodes.map((nextNode) => [...route, nextNode]));
    }
  }

  if (nextRoutes.every((route) => route[route.length - 1] == "end")) {
    return nextRoutes;
  } else {
    return expand(nextRoutes);
  }
};

var endRoutes = expand(startRoutes, 0);
console.log(endRoutes.length);
