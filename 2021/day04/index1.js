import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n");

function indexForBingo(horizontalSums) {
  for (
    let horizontalSumIndex = 0;
    horizontalSumIndex < horizontalSums.length;
    horizontalSumIndex++
  ) {
    const horizontalSum = horizontalSums[horizontalSumIndex];

    if (horizontalSum.some((x) => x == 5)) {
      return horizontalSumIndex;
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

var bingoCardHits = bingoCards.map((bingoCard) =>
  bingoCard.map((row) => row.map((x) => 0))
);

for (const value of values) {
  bingoCards.forEach((bingoCard, bingoCardIndex) => {
    bingoCard.forEach((bingCardRow, bingCardRowIndex) => {
      bingCardRow.forEach((bingCardRowValue, bingCardRowValueIndex) => {
        if (value == bingCardRowValue) {
          bingoCardHits[bingoCardIndex][bingCardRowIndex][
            bingCardRowValueIndex
          ] = 1;
        }
      });
    });
  });

  // Horizontal
  var horizontalSums = bingoCardHits.map((bingoCard) =>
    bingoCard.map((row) => row.reduce((acc, curr) => acc + curr))
  );

  var transpose = (matrix) =>
    Object.keys(matrix[0]).map((i) => matrix.map((r) => r[i]));

  // Vertical
  var verticalSums = bingoCardHits.map((bingoCard) =>
    transpose(bingoCard).map((row) => row.reduce((acc, curr) => acc + curr))
  );

  var horizontalBingoCardIndex = indexForBingo(horizontalSums);
  var verticalBingoCardIndex = indexForBingo(verticalSums);
  var bingoCardIndex =
    horizontalBingoCardIndex != -1
      ? horizontalBingoCardIndex
      : verticalBingoCardIndex;

  if (bingoCardIndex != -1) {
    var winningBingoCard = bingoCards[bingoCardIndex];
    var winningBingoCardHits = bingoCardHits[bingoCardIndex];

    var unmarkedNumbers = winningBingoCard.map((row, rowIndex) => {
      return row.map((value, valueIndex) => {
        return winningBingoCardHits[rowIndex][valueIndex] == 0 ? value : 0;
      });
    });
    const sum = unmarkedNumbers
      .reduce((a, b) => a.concat(b)) // flatten array
      .reduce((a, b) => a + b); // sum

    console.log(sum * value);

    break;
  }
}
