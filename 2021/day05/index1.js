import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var vents = lines.map((line) => {
  var [start, end] = line.split(" -> ");
  var startCoord = start.split(",");
  var endCoord = end.split(",");
  var startPoint = { x: parseInt(startCoord[0]), y: parseInt(startCoord[1]) };
  var endPoint = { x: parseInt(endCoord[0]), y: parseInt(endCoord[1]) };
  return { startPoint, endPoint };
});

var validVents = vents.filter(
  (vent) =>
    vent.startPoint.x == vent.endPoint.x || vent.startPoint.y == vent.endPoint.y
);

// console.log(validVents);

var maxX = Math.max(
  ...validVents.map((v) => Math.max(v.startPoint.x, v.endPoint.x))
);
var maxY = Math.max(
  ...validVents.map((v) => Math.max(v.startPoint.y, v.endPoint.y))
);
const grid = new Array(maxX + 1).fill(0).map(() => new Array(maxY + 1).fill(0));

var grid2 = validVents.reduce((acc, v) => {
  const startX = Math.min(v.startPoint.x, v.endPoint.x);
  const endX = Math.max(v.startPoint.x, v.endPoint.x);

  const startY = Math.min(v.startPoint.y, v.endPoint.y);
  const endY = Math.max(v.startPoint.y, v.endPoint.y);

  for (let x = startX; x <= endX; x++) {
    for (let y = startY; y <= endY; y++) {
      acc[x][y] = acc[x][y] + 1;
    }
  }
  return acc;
}, grid);

var numberOfPointsWithMoreThanTwoVents = 0;
grid.map((row) => {
  row.map((value) => {
    value >= 2 ? numberOfPointsWithMoreThanTwoVents++ : null;
  });
});

console.log(numberOfPointsWithMoreThanTwoVents);
