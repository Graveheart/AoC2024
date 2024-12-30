from pyaoc import Env
from collections import Counter

e = Env(1)
e.T("""3   4
4   3
2   5
1   3
3   9
3   3""", 11, 31)


def map_input(input) -> tuple[list[int],list[int]]:
    lines = input.get_valid_lines()
    numbers = [[int(v) for v in line.split()] for line in lines]
    l_side = [x[0] for x in numbers]
    r_side = [x[1] for x in numbers]
    return l_side, r_side


def part1(input):
    l_side, r_side = map_input(input)
    l_side.sort()
    r_side.sort()
    return sum([abs(d[0] - d[1]) for d in zip(l_side, r_side)])


e.run_tests(1, part1)
e.run_main(1, part1)


def part2(input):
    l_side, r_side = map_input(input)
    c = Counter(r_side)
    return sum([v * c[v] for v in l_side if v in c])


e.run_tests(2, part2)
e.run_main(2, part2)