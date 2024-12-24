import { parseArgs } from "node:util";
const defaultInput = await Bun.file("input.txt").text();

const { values } = parseArgs({
	args: Bun.argv,
	options: {
		defaultInput: {
			type: "boolean",
		},
		part: {
			type: "string",
			default: "1",
		},
	},
	strict: true,
	allowPositionals: true,
});

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

export const findSimilarity = (input: string = defaultInput) => {
	const { lSide, rSide } = mapInput(input);
	const similarityMap = new Map<number, number>();
	const searchSimilarity = (searchValue: number) => {
		if (similarityMap.has(searchValue)) {
			return similarityMap.get(searchValue) as number;
		}
		const valSimilarity = rSide.filter((x) => x === searchValue).length;
		similarityMap.set(searchValue, valSimilarity);
		return valSimilarity;
	};
	const distance = lSide.reduce(
		(acc, val, i) => acc + val * searchSimilarity(val),
		0,
	);
	return distance;
};

let partToExecute = findDistance;
if (values.part === "2") {
	partToExecute = findSimilarity;
}

if (values.defaultInput) {
	console.log(partToExecute());
}
