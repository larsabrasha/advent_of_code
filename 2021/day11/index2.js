import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var matrix = lines.map((line) => line.split("").map((x) => parseInt(x)));

var width = matrix[0].length;
var height = lines.length;

console.log("Initial matrix:");
console.table(matrix);

var numberOfFlashes = 0;

var flashRecursive = (theMatrix, alreadyFlashed) => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      var value = theMatrix[y][x];

      if (value > 9 && alreadyFlashed[y][x] == 0) {
        numberOfFlashes++;
        alreadyFlashed[y][x] = 1;

        for (let innerY = y - 1; innerY <= y + 1; innerY++) {
          for (let innerX = x - 1; innerX <= x + 1; innerX++) {
            if (
              innerY >= 0 &&
              innerY < height &&
              innerX >= 0 &&
              innerX < width &&
              !(innerY == y && innerX == x) &&
              theMatrix[y][x] != undefined &&
              alreadyFlashed[innerY][innerX] == 0
            ) {
              theMatrix[innerY][innerX] = theMatrix[innerY][innerX] + 1;
            }
          }
        }

        theMatrix[y][x] = 0;
      }
    }
  }

  if (theMatrix.some((line) => line.some((x) => x > 9))) {
    flashRecursive(theMatrix, alreadyFlashed);
  }
};

for (let step = 1; step <= 1000; step++) {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      matrix[y][x] = matrix[y][x] + 1;
    }
  }

  var alreadyFlashed = new Array(height)
    .fill(0)
    .map(() => new Array(width).fill(0));

  flashRecursive(matrix, alreadyFlashed);

  // console.log("After step " + step + ":");
  // console.table(matrix);

  var sum = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      sum += matrix[y][x];
    }
  }
  // console.log("sum:", sum);
  if (sum == 0) {
    console.log("Sum is 0 at step: " + step);
    break;
  }
}

console.log("numberOfFlashes:", numberOfFlashes);
