import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const values = lines.map((line) => line.split(""));

const xMax = values[0].length;
const yMax = lines.length;

const minValues = [];

for (let x = 0; x < xMax; x++) {
  for (let y = 0; y < yMax; y++) {
    const value = parseInt(values[y][x]);

    if (
      (x == 0 || value < parseInt(values[y][x - 1])) &&
      (y == 0 || value < parseInt(values[y - 1][x])) &&
      (x == xMax - 1 || value < parseInt(values[y][x + 1])) &&
      (y == yMax - 1 || value < parseInt(values[y + 1][x]))
    ) {
      minValues.push(value);
    }
  }
}

const sum = minValues.map((x) => x + 1).reduce((a, b) => a + b);
console.log(sum);
