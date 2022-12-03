with open("data.txt") as file:
    dots, folds = file.read().split("\n\n")
    dots = {(int(x), int(y)) for x, y in (row.split(",") for row in dots.splitlines())}
    folds = [(axis, int(pos)) for axis, pos in (row.split(" ")[-1].split("=") for row in folds.splitlines())]

print(folds)

def fold(x, y, axis, pos):
    if axis == "x":
        if x == pos:
            return None
        return (x, y) if x < pos else (2 * pos - x, y)
    else:
        if y == pos:
            return None
        return (x, y) if y < pos else (x, 2 * pos - y)

for i in range(len(folds)):
    dots = {dot for x, y in dots if (dot:=fold(x, y, *folds[i]))}
    if i == 0:
        print(len(dots)) # part 1

width = max(x for x, y in dots) + 1
height = max(y for x, y in dots) + 1
grid = [[" " for _ in range(width)] for _ in range(height)]
for x, y in dots:
    grid[y][x] = "#"
for row in grid:
    print("".join(row)) # part 2