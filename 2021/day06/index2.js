import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var fishes = lines[0].split(",").map((x) => parseInt(x));

var sea = fishes.reduce((acc, curr) => {
  acc[curr] = (acc[curr] || 0) + 1;
  return acc;
}, {});

console.log(sea);

for (let i = 0; i < 256; i++) {
  const newSea = {};
  newSea[0] = sea[1] || 0;
  newSea[1] = sea[2] || 0;
  newSea[2] = sea[3] || 0;
  newSea[3] = sea[4] || 0;
  newSea[4] = sea[5] || 0;
  newSea[5] = sea[6] || 0;
  newSea[6] = (sea[7] || 0) + (sea[0] || 0);
  newSea[7] = sea[8] || 0;
  newSea[8] = sea[0] || 0;

  sea = newSea;
}

console.log(sea);
const sum = Object.values(sea).reduce((acc, curr) => acc + curr);
console.log(sum);
