import fs from "fs";

var transpose = (matrix) =>
  Object.keys(matrix[0]).map((i) => matrix.map((r) => r[i]));

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const lineLength = lines[0].length;

var oxygenMatrix = lines.map((line) => line.split("").map((x) => parseInt(x)));
var co2Matrix = lines.map((line) => line.split("").map((x) => parseInt(x)));

for (let columnIndex = 0; columnIndex < lineLength; columnIndex++) {
  if (oxygenMatrix.length > 1) {
    const transposedOxygenMatrix = transpose(oxygenMatrix);
    const oxygenValues = transposedOxygenMatrix[columnIndex];
    const oxygenSum = oxygenValues.reduce((a, b) => a + b, 0);
    const mostCommonOxygenBit = oxygenSum >= oxygenValues.length / 2 ? 1 : 0;
    oxygenMatrix = oxygenMatrix.filter(
      (row) => row[columnIndex] === mostCommonOxygenBit
    );
  }

  if (co2Matrix.length > 1) {
    const transposedco2Matrix = transpose(co2Matrix);
    const co2Values = transposedco2Matrix[columnIndex];
    const co2Sum = co2Values.reduce((a, b) => a + b, 0);
    const leastCommonCo2Bit = co2Sum < co2Values.length / 2 ? 1 : 0;
    co2Matrix = co2Matrix.filter(
      (row) => row[columnIndex] === leastCommonCo2Bit
    );
  }
}

const oxygenValue = parseInt(oxygenMatrix[0].join(""), 2);
const co2Value = parseInt(co2Matrix[0].join(""), 2);
console.log(oxygenValue * co2Value);
