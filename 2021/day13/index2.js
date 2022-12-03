import fs from "fs";

const data = fs.readFileSync("data-small.txt", { encoding: "utf8" });
const lines = data.split("\n");

var emptyLineIndex = lines.findIndex((line) => line == "");

const coordinateLines = lines.slice(0, emptyLineIndex);
const foldInstructions = lines.slice(emptyLineIndex + 1);
// console.log(coordinateLines, foldInstructions);

var coordinates = coordinateLines.map((coord) =>
  coord.split(",").map((c) => c)
);
const width =
  coordinates.reduce((acc, curr) => (curr[0] > acc ? curr[0] : acc), 0) + 1;
const height =
  coordinates.reduce((acc, curr) => (curr[1] > acc ? curr[1] : acc), 0) + 1;
console.log(coordinates);
console.log("width:", width, "height:", height);

function createGrid(width, height, value) {
  return new Array(height).fill(value).map(() => new Array(width).fill(value));
}

var grid = createGrid(width, height, " ");

for (var [x, y] of coordinates) {
  console.log(x, y);
  grid[y][x] = "X";
}

// console.log("startGrid");
// console.table(grid);

var instructions = foldInstructions.map((foldInstruction) => {
  var command = foldInstruction.split("=")[0];
  var value = parseInt(foldInstruction.split("=")[1]);
  return [command, value];
});

function fold(grid, [command, value]) {
  if (command == "fold along y") {
    const newWidth = grid[0].length;
    const newHeight = Math.max(value, grid.length - 1 - value);
    const newGrid = createGrid(newWidth, newHeight, " ");

    for (let x = 0; x < newWidth; x++) {
      for (let y = 0; y < newHeight; y++) {
        newGrid[y][x] =
          grid[y][x] == "X" || grid[grid.length - 1 - y][x] == "X" ? "X" : " ";
      }
    }
    return newGrid;
  } else {
    const newWidth = Math.max(value, grid[0].length - 1 - value);
    const newHeight = grid.length;
    const newGrid = createGrid(newWidth, newHeight, " ");

    for (let x = 0; x < newWidth; x++) {
      for (let y = 0; y < newHeight; y++) {
        newGrid[y][x] =
          grid[y][x] == "X" || grid[y][grid[0].length - 1 - x] == "X"
            ? "X"
            : " ";
      }
    }
    return newGrid;
  }
}

function foldGridWithInstructions(grid, instructions) {
  if (instructions.length == 0) {
    return grid;
  } else {
    var instruction = instructions[0];
    grid = fold(grid, instruction);
    return foldGridWithInstructions(grid, instructions.slice(1), --i);
  }
}

console.log(instructions);

var endGrid = foldGridWithInstructions(grid, instructions);

// console.log("endGrid:");
console.table(endGrid);
