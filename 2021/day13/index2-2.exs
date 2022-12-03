from functools import reduce

with open("data-small.txt", "r") as file:
    lines = file.read().splitlines(False)

emptyLineIndex = lines.index("")

coordinateLines = lines[:emptyLineIndex]
foldInstructions = lines[emptyLineIndex + 1:]

coordinates = list(map(lambda coord: list(map(lambda x: int(x), coord.split(","))), coordinateLines))

width = reduce(lambda acc, curr: curr[0] if curr[0] > acc else acc, coordinates, 0) + 1
height = reduce(lambda acc, curr: curr[1] if curr[1] > acc else acc, coordinates, 0) + 1

print(width, height)

