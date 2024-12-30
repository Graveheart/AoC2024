from pyaoc import Env

e = Env(2)
e.T("""7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9""", 2, 4)


def is_safe(nums: list[int]) -> bool:
    diffs = [nums[i] - nums[i+1] for i in range(len(nums)-1)]
    all_inc = all([x > 0 and x <= 3 for x in diffs])
    all_dec = all([x < 0 and x >= -3 for x in diffs])
    return all_inc or all_dec


def damper_safe(nums: list[int]) -> bool:
    if is_safe(nums):
        return True
    for i in range(len(nums)):
        if is_safe(nums[:i] + nums[i+1:]):
            return True
    return False


def part1(input) -> int:
    safe = 0
    for line in input.get_valid_lines():
        nums = [int(x) for x in line.split()]
        if is_safe(nums):
            safe += 1
    return safe


e.run_tests(1, part1)
e.run_main(1, part1)


def part2(input) -> int:
    safe = 0
    for line in input.get_valid_lines():
        nums = [int(x) for x in line.split()]
        if damper_safe(nums):
            safe += 1
    return safe


e.run_tests(2, part2)
e.run_main(2, part2)