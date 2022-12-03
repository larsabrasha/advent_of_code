import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const values = lines[0].split(",").map((x) => parseInt(x));
const crabPositions = values.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

const minX = Math.min(...values);
const maxX = Math.max(...values);

const sums = Array(maxX - minX + 1).fill(0);

for (let x = minX; x <= maxX; x++) {
  var sumAtX = 0;

  for (let index = minX; index <= maxX; index++) {
    const crabsAtIndex = crabPositions[index];

    const n = Math.abs(x - index);
    const cost = (n * (1 + n)) / 2;

    if (crabsAtIndex != undefined) {
      sumAtX += cost * crabsAtIndex;
    }
  }
  sums[x] = sumAtX;
}

const minPosition = sums.reduce((acc, curr, index) => {
  if (index == 0 || curr < acc.value) {
    return { index: index, value: curr };
  }
  return acc;
}, {});
console.log(minPosition.value);
