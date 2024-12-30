import "@total-typescript/ts-reset";
import { showResult } from "../utils";
const defaultInput = await Bun.file("input.txt").text();

type CheckWordParams = {
	grid: string[];
	row: number;
	col: number;
	rowDirection: number;
	colDirection: number;
};

const directions = [-1, 0, 1];

const checkWord = ({
	grid,
	row,
	col,
	rowDirection,
	colDirection,
}: CheckWordParams): boolean => {
	const xmasStr = "XMAS";
	const wordLength = xmasStr.length;
	const lastRow = row + (wordLength - 1) * rowDirection;
	const lastCol = col + (wordLength - 1) * colDirection;
	if (
		lastRow < 0 ||
		lastCol < 0 ||
		lastRow >= grid.length ||
		lastCol >= grid[0].length
	) {
		return false;
	}
	const stringToCheck = Array(wordLength)
		.fill(0)
		.reduce((acc, _, i) => {
			return acc + grid[row + i * rowDirection][col + i * colDirection];
		}, "");
	return xmasStr === stringToCheck;
};

const count_xmas_in_directions = (
	grid: string[],
	row: number,
	col: number,
): number => {
	let count = 0;
	directions.forEach((rowDirection) => {
		directions.forEach((colDirection) => {
			if (
				checkWord({
					grid,
					row,
					col,
					rowDirection,
					colDirection,
				})
			) {
				count += 1;
			}
		});
	});
	return count;
};

const count_xmas = (lines: string[]): number => {
	let count = 0;
	for (let row = 0; row < lines.length; ++row) {
		for (let col = 0; col < lines[row].length; ++col) {
			if (lines[row][col] === "X") {
				count += count_xmas_in_directions(lines, row, col);
			}
		}
	}
	return count;
};

export const part1 = (input: string = defaultInput): number => {
	const res = count_xmas(input.split("\n"));
	return res;
};
const masStr = "MAS";

export const part2 = (input: string = defaultInput): number => {
	const searchStr = [masStr, [...masStr].reverse().join("")];
	const grid = input.split("\n");
	let count = 0;
	for (let row = 0; row < grid.length - 1; ++row) {
		if (row === 0) continue;
		for (let col = 0; col < grid[row].length - 1; ++col) {
			let leftDiagonal = "";
			let rightDiagonal = "";
			for (const direction of directions) {
				if (col === 0) continue;
				leftDiagonal = leftDiagonal + grid[row + direction][col + direction];
				rightDiagonal = rightDiagonal + grid[row + direction][col - direction];
			}
			if (
				searchStr.includes(leftDiagonal) &&
				searchStr.includes(rightDiagonal)
			) {
				count++;
			}
		}
	}
	return count;
};

showResult(part1(), 1);
showResult(part2(), 2);
