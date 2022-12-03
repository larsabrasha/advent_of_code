import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n");

var emptyLineIndex = lines.findIndex((line) => line == "");

const coordinateLines = lines.slice(0, emptyLineIndex);
const foldInstructions = lines.slice(emptyLineIndex + 1);
// console.log(coordinateLines, foldInstructions);

var coordinates = coordinateLines.map((coord) =>
  coord.split(",").map((c) => parseInt(c))
);
const width =
  coordinates.reduce((acc, curr) => (curr[0] > acc ? curr[0] : acc), 0) + 1;
const height =
  coordinates.reduce((acc, curr) => (curr[1] > acc ? curr[1] : acc), 0) + 1;
// console.log(coordinates);
// console.log("width:", width, "height:", height);

function createGrid(width, height, value) {
  return new Array(height).fill(value).map(() => new Array(width).fill(value));
}

var grid = createGrid(width, height, 0);

for (var [x, y] of coordinates) {
  grid[y][x] = 1;
}

// console.log("startGrid");
// console.table(grid);

var instructions = foldInstructions.map((foldInstruction) => {
  var command = foldInstruction.split("=")[0];
  var value = parseInt(foldInstruction.split("=")[1]);
  return [command, value];
});
// console.log(instructions);

const firstInstruction = instructions[0];

function fold(grid, [command, value]) {
  if (command == "fold along y") {
    const newWidth = grid[0].length;
    const newHeight = Math.max(value, grid.length - 1 - value);
    const newGrid = createGrid(newWidth, newHeight);

    for (let x = 0; x < newWidth; x++) {
      for (let y = 0; y < newHeight; y++) {
        newGrid[y][x] =
          grid[y][x] == 1 || grid[grid.length - 1 - y][x] == 1 ? 1 : 0;
      }
    }
    return newGrid;
  } else {
    const newHeight = grid.length;
    const newWidth = Math.max(value, grid[0].length - 1 - value);
    const newGrid = createGrid(newWidth, newHeight);

    for (let x = 0; x < newWidth; x++) {
      for (let y = 0; y < newHeight; y++) {
        newGrid[y][x] =
          grid[y][x] == 1 || grid[y][grid[0].length - 1 - x] == 1 ? 1 : 0;
      }
    }
    return newGrid;
  }
}

function sumGridValues(grid) {
  var sum = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      sum += grid[y][x];
    }
  }
  return sum;
}

var nextGrid = fold(grid, firstInstruction);
// console.table(nextGrid);
var sum = sumGridValues(nextGrid);
console.log(sum);

// console.log("nextGrid:");
// console.table(nextGrid);
