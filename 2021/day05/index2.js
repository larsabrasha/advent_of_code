import { ENGINE_METHOD_PKEY_ASN1_METHS } from "constants";
import fs from "fs";

var range = (first, last) => {
  var direction = first < last ? 1 : -1;
  return Array.from(
    { length: Math.abs(last - first) + 1 },
    (_, i) => first + i * direction
  );
};

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
    vent.startPoint.x == vent.endPoint.x ||
    vent.startPoint.y == vent.endPoint.y ||
    Math.abs(vent.startPoint.x - vent.endPoint.x) ===
      Math.abs(vent.startPoint.y - vent.endPoint.y)
);

var maxX = Math.max(
  ...validVents.map((v) => Math.max(v.startPoint.x, v.endPoint.x))
);
var maxY = Math.max(
  ...validVents.map((v) => Math.max(v.startPoint.y, v.endPoint.y))
);
const grid = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0));

var grid2 = validVents.reduce((acc, v) => {
  var xValues = range(v.startPoint.x, v.endPoint.x);
  var yValues = range(v.startPoint.y, v.endPoint.y);

  if (xValues.length == yValues.length) {
    for (let index = 0; index < xValues.length; index++) {
      const x = xValues[index];
      const y = yValues[index];
      acc[y][x] = acc[y][x] + 1;
    }
  } else {
    for (let x of xValues) {
      for (let y of yValues) {
        acc[y][x] = acc[y][x] + 1;
      }
    }
  }
  return acc;
}, grid);

// console.table(grid2);

var numberOfPointsWithMoreThanTwoVents = 0;
grid2.forEach((row) => {
  row.forEach((value) => {
    value >= 2 ? numberOfPointsWithMoreThanTwoVents++ : null;
  });
});

console.log(numberOfPointsWithMoreThanTwoVents);
