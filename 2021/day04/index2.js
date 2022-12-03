import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n");

var transpose = (matrix) =>
  Object.keys(matrix[0]).map((i) => matrix.map((r) => r[i]));

const createEmptyMatrix = (size) =>
  new Array(size).fill(0).map(() => new Array(size).fill(0));

function indexForBingo(sums) {
  for (let sumIndex = 0; sumIndex < sums.length; sumIndex++) {
    const sum = sums[sumIndex];

    if (sum.some((x) => x == 5)) {
      return sumIndex;
    }
  }

  return -1;
}

var values = lines[0].split(",").map((x) => parseInt(x));
var bingoCards = data
  .split("\n\n")
  .slice(1)
  .map((x) => x.split("\n"))
  .map((x) =>
    x.map((y) =>
      y
        .split(" ")
        .filter((x) => x != "")
        .map((x) => parseInt(x))
    )
  );

console.log(bingoCards);

var bingoCardResults = bingoCards.map((x) => ({
  gotBingoAtIndex: -1,
  gotBingoWithValue: -1,
  winningCard: null,
  hits: createEmptyMatrix(5),
  product: -1,
}));

console.log(bingoCardResults.map((x) => x.hits));

for (const value of values) {
  bingoCards.forEach((bingoCard, bingoCardIndex) => {
    bingoCard.forEach((bingCardRow, bingCardRowIndex) => {
      bingCardRow.forEach((bingCardRowValue, bingCardRowValueIndex) => {
        if (value == bingCardRowValue) {
          bingoCardResults[bingoCardIndex].hits[bingCardRowIndex][
            bingCardRowValueIndex
          ] = 1;
        }
      });
    });
  });

  bingoCards.forEach((bingoCard, bingoCardIndex) => {
    const bingoCardResult = bingoCardResults[bingoCardIndex];

    if (bingoCardResult.gotBingoAtIndex == -1) {
      var rowSums = bingoCardResult.hits.map((row) =>
        row.reduce((acc, curr) => acc + curr)
      );
      var colSums = transpose(bingoCardResult.hits).map((row) =>
        row.reduce((acc, curr) => acc + curr)
      );

      if (rowSums.some((x) => x == 5) || colSums.some((x) => x == 5)) {
        bingoCardResult.gotBingoAtIndex = values.indexOf(value);
        bingoCardResult.gotBingoWithValue = value;
        bingoCardResult.winningCard = bingoCard;

        var unmarkedNumbers = bingoCardResult.winningCard.map(
          (row, rowIndex) => {
            return row.map((value, valueIndex) => {
              return bingoCardResult.hits[rowIndex][valueIndex] == 0
                ? value
                : 0;
            });
          }
        );
        const sum = unmarkedNumbers
          .reduce((a, b) => a.concat(b)) // flatten array
          .reduce((a, b) => a + b); // sum

        bingoCardResult.product = sum * value;
      }
    }
  });
}

console.log(bingoCardResults);

var lastWinningBingoCardResult = bingoCardResults.sort(
  (a, b) => b.gotBingoAtIndex - a.gotBingoAtIndex
)[0];

console.log(lastWinningBingoCardResult.product);
