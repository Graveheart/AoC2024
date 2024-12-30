import { showResult } from "../utils";

const defaultInput = await Bun.file("input.txt").text();

const mapInput = (input: string) => {
	const lSide: number[] = [];
	const rSide: number[] = [];
	input.split("\n").forEach((line) => {
		const mappedLine = line.split(" ").map((d) => Number.parseInt(d));
		// Move the first number to lSide and the last number to rSide
		lSide.push(mappedLine.shift() as number);
		rSide.push(mappedLine.pop() as number);
	});
	return { lSide, rSide };
};

export const findDistance = (input: string = defaultInput) => {
	const { lSide, rSide } = mapInput(input);
	lSide.sort((a, b) => a - b);
	rSide.sort((a, b) => a - b);
	const distance = lSide.reduce(
		(acc, val, i) => acc + Math.abs(rSide[i] - val),
		0,
	);
	return distance;
};

export const findSimilarity = (input: string = defaultInput): number => {
	const { lSide, rSide } = mapInput(input);
	const similarityMap = new Map<number, number>();
	rSide.forEach((val) => {
		similarityMap.set(val, (similarityMap.get(val) ?? 0) + 1);
	});
	const distance = lSide.reduce(
		(acc, val) => acc + val * (similarityMap.get(val) ?? 0),
		0,
	);
	return distance;
};

showResult(findDistance(), 1);
showResult(findSimilarity(), 2);
