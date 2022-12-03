import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const lineLength = lines[0].length;

const matrix = lines.map((line) => line.split(""));

const columns = [...Array(lineLength).keys()].map((index) =>
  matrix.map((x) => x[index])
);
const gammaValues = columns.map((column) =>
  column.map((x) => parseInt(x)).reduce((a, b) => a + b) > lines.length / 2
    ? "1"
    : "0"
);
const epsilonValues = gammaValues.map((x) => (x == "1" ? "0" : "1"));

const gammaValueInDecimal = parseInt(gammaValues.join(""), 2);
const epsilonValueInDecimal = parseInt(epsilonValues.join(""), 2);

console.log(gammaValues, gammaValueInDecimal);
console.log(epsilonValues, epsilonValueInDecimal);
console.log(gammaValueInDecimal * epsilonValueInDecimal);