import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var filteredLines = lines.filter((line) => {
  var chars = line;
  var stack = [chars[0]];

  var shouldKeep = true;

  for (let index = 1; index < chars.length; index++) {
    const char = chars[index];
    const lastChar = stack[stack.length - 1];

    if (
      (lastChar == "(" && (char == "]" || char == "}" || char == ">")) ||
      (lastChar == "[" && (char == ")" || char == "}" || char == ">")) ||
      (lastChar == "{" && (char == "]" || char == ")" || char == ">")) ||
      (lastChar == "<" && (char == "]" || char == "}" || char == ")"))
    ) {
      shouldKeep = false;
      break;
    } else if (
      (lastChar == "(" && char == ")") ||
      (lastChar == "[" && char == "]") ||
      (lastChar == "{" && char == "}") ||
      (lastChar == "<" && char == ">")
    ) {
      stack.pop();
    } else {
      stack.push(char);
    }
  }

  return shouldKeep;
});

var pairs = ["()", "[]", "{}", "<>"];

var filterPairs = (line) =>
  pairs.some((pair) => line.indexOf(pair) != -1)
    ? filterPairs(pairs.reduce((acc, curr) => acc.replaceAll(curr, ""), line))
    : line;

var allClosingChars = filteredLines.map((line) =>
  filterPairs(line)
    .split("")
    .map((x) =>
      x == "(" ? ")" : x == "[" ? "]" : x == "{" ? "}" : x == "<" ? ">" : ""
    )
    .reverse()
    .join("")
);

var scores = { ")": 1, "]": 2, "}": 3, ">": 4 };

var points = allClosingChars.map((closingChars) =>
  closingChars.split("").reduce((acc, curr) => 5 * acc + scores[curr], 0)
);

var sortedPoints = points.sort(function (a, b) {
  return a - b;
});
var middlePoint = sortedPoints[(sortedPoints.length - 1) / 2];
console.log(middlePoint);
