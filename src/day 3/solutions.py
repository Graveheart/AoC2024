import re
from pyaoc import Env

e = Env(3)
e.T("xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))", 161, None)
e.T("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))", 161, 48)


def part1(input) -> int:
    total = 0
    regexp = re.compile(r'mul\((\d+),(\d+)\)')
    for ln in input.get_valid_lines():
        muls = regexp.findall(ln)
        for m in muls:
            total += int(m[0]) * int(m[1])
    return total


e.run_tests(1, part1)
e.run_main(1, part1)


def part2(input) -> int:
    total = 0
    regexp = re.compile(r"mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))")
    enabled = True
    for ln in input.get_valid_lines():
        matches = regexp.findall(ln)
        for m in matches:
            if len(m[2]):
                enabled = True
            elif len(m[3]):
                enabled = False
            elif enabled:
                total += int(m[0]) * int(m[1])
    return total


e.run_tests(2, part2)
e.run_main(2, part2)