import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

var points = { ")": 3, "]": 57, "}": 1197, ">": 25137 };

var scores = lines.map((line) => {
  var chars = line;
  var stack = [chars[0]];

  var score = 0;

  for (let index = 1; index < chars.length; index++) {
    const char = chars[index];
    const lastChar = stack[stack.length - 1];

    if (
      (lastChar == "(" && (char == "]" || char == "}" || char == ">")) ||
      (lastChar == "[" && (char == ")" || char == "}" || char == ">")) ||
      (lastChar == "{" && (char == "]" || char == ")" || char == ">")) ||
      (lastChar == "<" && (char == "]" || char == "}" || char == ")"))
    ) {
      console.log("wrong for", "(", "got", char, "score", points[char]);
      score = points[char];
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

  return score;
});

var sum = scores.reduce((a, b) => a + b);

// console.log(scores);
console.log(sum);
