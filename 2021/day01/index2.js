import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const numberOfIncreses = lines
  .map((x) => parseInt(x))
  .map((_value, index, array) =>
    index < 3 ? 0 : array[index] > array[index - 3] ? 1 : 0
  )
  .reduce((prev, curr) => prev + curr, 0);

console.log(numberOfIncreses);
