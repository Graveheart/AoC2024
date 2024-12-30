import { showResult } from "../utils";

const defaultInput = await Bun.file("input.txt").text();

const matchMultiplications = (input: string): RegExpExecArray[] => {
	const regexp = /mul\((\d+),(\d+)\)/gm;
	return [...input.matchAll(regexp)];
};

export const part1 = (input: string = defaultInput): number => {
	const res = matchMultiplications(input).reduce((acc, match) => {
		const [_full, a, b] = match;
		return acc + Number.parseInt(a) * Number.parseInt(b);
	}, 0);
	return res;
};

export const part2 = (input: string = defaultInput): number => {
	const regexp = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/gm;
	let enabled = true;
	const matchDoDont = (acc: number, match: RegExpExecArray) => {
		const [full, a, b] = match;
		if (full === "do()") {
			enabled = true;
		} else if (full === "don't()") {
			enabled = false;
		} else if (enabled) {
			return acc + Number.parseInt(a) * Number.parseInt(b);
		}
		return acc;
	};
	const res = [...input.matchAll(regexp)].reduce(matchDoDont, 0);
	return res;
};
showResult(part1(), 1);
showResult(part2(), 2);
