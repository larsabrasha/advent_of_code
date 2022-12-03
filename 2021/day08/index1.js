import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const sum = lines.reduce(
  (acc, line) =>
    acc +
    line
      .split("|")[1]
      .split(" ")
      .filter((x) => x != "")
      .filter(
        (x) => x.length == 2 || x.length == 3 || x.length == 4 || x.length == 7
      ).length,
  0
);

console.log(sum);
