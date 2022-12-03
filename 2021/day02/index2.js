import fs from "fs";

const data = fs.readFileSync("data.txt", { encoding: "utf8" });
const lines = data.split("\n").filter((x) => x != "");

const destination = lines
  .map((line) => {
    const splitted = line.split(" ");
    const command = splitted[0];
    const value = parseInt(splitted[1]);
    return { command, value };
  })
  .reduce(
    (acc, curr) =>
      curr.command == "forward"
        ? { x: acc.x + curr.value, y: acc.y + acc.aim * curr.value, aim: acc.aim }
        : curr.command == "down"
        ? { x: acc.x, y: acc.y, aim: acc.aim + curr.value }
        : curr.command == "up"
        ? { x: acc.x, y: acc.y, aim: acc.aim - curr.value }
        : acc,
    { x: 0, y: 0, aim: 0 }
  );

  console.log(destination.x, destination.y);
  console.log(destination.x * destination.y);
