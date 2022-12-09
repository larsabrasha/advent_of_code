import fs from "fs";

const data = fs.readFileSync("inputs/day08.txt", { encoding: "utf8" });

var matrix = data
  .trim()
  .split("\n")
  .map((x) => x.split("").map((y) => parseInt(y)));

class Day8Part1 {
  static calculateNumberOfVisibleTrees = (matrix) => {
    const height = matrix.length;
    const width = matrix[0].length;

    var canBeSeenMatrix = new Array(height)
      .fill(true)
      .map(() => new Array(width).fill(true));

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const elementHeight = matrix[y][x];

        var canBeSeenFromLeft = true;
        for (let i = 0; i < x; i++) {
          const otherHeight = matrix[y][i];
          if (otherHeight >= elementHeight) {
            canBeSeenFromLeft = false;
            break;
          }
        }

        var canBeSeenFromRight = true;
        for (let i = x + 1; i < width; i++) {
          const otherHeight = matrix[y][i];
          if (otherHeight >= elementHeight) {
            canBeSeenFromRight = false;
            break;
          }
        }

        var canBeSeenFromTop = true;
        for (let i = 0; i < y; i++) {
          const otherHeight = matrix[i][x];
          if (otherHeight >= elementHeight) {
            canBeSeenFromTop = false;
            break;
          }
        }

        var canBeSeenFromBottom = true;
        for (let i = y + 1; i < height; i++) {
          const otherHeight = matrix[i][x];
          if (otherHeight >= elementHeight) {
            canBeSeenFromBottom = false;
            break;
          }
        }

        canBeSeenMatrix[y][x] =
          canBeSeenFromLeft ||
          canBeSeenFromRight ||
          canBeSeenFromTop ||
          canBeSeenFromBottom;
      }
    }
    var numberOfVisibleTrees = canBeSeenMatrix
      .flatMap((row) => row.map((x) => (x ? 1 : 0)))
      .reduce((acc, cur) => acc + cur);

    return numberOfVisibleTrees;
  };
}

class Day8Part2 {
  static calculateScenicScores = (matrix) => {
    const height = matrix.length;
    const width = matrix[0].length;

    var scenicScores = new Array(height)
      .fill(0)
      .map(() => new Array(width).fill(0));

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const elementHeight = matrix[y][x];

        var numberOfVisibleTreesAtLeft = 0;
        for (let i = x - 1; i >= 0; i--) {
          const otherHeight = matrix[y][i];
          if (otherHeight < elementHeight) {
            numberOfVisibleTreesAtLeft++;
          } else if (otherHeight >= elementHeight) {
            numberOfVisibleTreesAtLeft++;
            break;
          }
        }

        var numberOfVisibleTreesAtRight = 0;
        for (let i = x + 1; i < width; i++) {
          const otherHeight = matrix[y][i];
          if (otherHeight < elementHeight) {
            numberOfVisibleTreesAtRight++;
          } else if (otherHeight >= elementHeight) {
            numberOfVisibleTreesAtRight++;
            break;
          }
        }

        var numberOfVisibleTreesAtTop = 0;
        for (let i = y - 1; i >= 0; i--) {
          const otherHeight = matrix[i][x];
          if (otherHeight < elementHeight) {
            numberOfVisibleTreesAtTop++;
          } else if (otherHeight >= elementHeight) {
            numberOfVisibleTreesAtTop++;
            break;
          }
        }

        var numberOfVisibleTreesAtTopBottom = 0;
        for (let i = y + 1; i < height; i++) {
          const otherHeight = matrix[i][x];
          if (otherHeight < elementHeight) {
            numberOfVisibleTreesAtTopBottom++;
          } else if (otherHeight >= elementHeight) {
            numberOfVisibleTreesAtTopBottom++;
            break;
          }
        }

        scenicScores[y][x] =
          numberOfVisibleTreesAtTop *
          numberOfVisibleTreesAtLeft *
          numberOfVisibleTreesAtRight *
          numberOfVisibleTreesAtTopBottom;
      }
    }

    return scenicScores;
  };

  static calculateMaxScenicScore = (matrix) => {
    const scenicScores = Day8Part2.calculateScenicScores(matrix);

    return scenicScores
      .flatMap((x) => x)
      .reduce((prev, cur) => (cur > prev ? cur : prev), 0);
  };
}

console.log("Part 1:", Day8Part1.calculateNumberOfVisibleTrees(matrix))
console.log("Part 2:", Day8Part2.calculateMaxScenicScore(matrix));
