from collections import defaultdict
from pyaoc.pyaoc import Env, Input

e = Env(4)
e.T("""MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX""", 18, 9)

xmas_str = "XMAS"
mas_str = "MAS"

def make_input_into_grid(file_input: Input):
    grid = defaultdict(str) | {(row_index, col_index): col for row_index, row in enumerate(file_input.get_valid_lines())
                               for col_index, col in enumerate(row)}
    return grid

def part1(file_input: Input):
    grid = make_input_into_grid(file_input)
    grid_positions = list(grid.keys())
    directions = -1,0,1
    total_sum = 0
    for row_direction in directions:
        for col_direction in directions:
            for row, col in grid_positions:
                word = [grid[row + row_direction * index, col + col_direction * index] for index in range(len(xmas_str))]
                total_sum += word == list(xmas_str)
    return total_sum

def part2(file_input: Input):
    grid = make_input_into_grid(file_input)
    grid_positions = list(grid.keys())
    directions = -1,0,1
    total_sum = 0
    search_str = list(mas_str), list(reversed(mas_str))
    for row, col in grid_positions:
        if row == 0 or col == 0: continue
        left_diagonal = [grid[row + direction, col + direction] for direction in directions]
        right_diagonal = [grid[row + direction, col - direction] for direction in directions]
        total_sum += (left_diagonal in search_str) and (right_diagonal in search_str)
    return total_sum

e.run_tests(1, part1)
e.run_main(1, part1)

e.run_tests(2, part2)
e.run_main(2, part2)