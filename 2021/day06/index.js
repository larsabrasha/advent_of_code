import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var fishes = lines[0].split(",").map((x) => parseInt(x));
console.log(fishes);

for (let i = 0; i < 80; i++) {
  var numberOfZeros = 0;
  fishes = fishes
    .map((x) => {
      if (x == 0) {
        numberOfZeros++;
        return 6;
      } else {
        return x - 1;
      }
    })
    .concat(Array(numberOfZeros).fill(8));

  //   console.log(fishes);
}

console.log(fishes.length);
