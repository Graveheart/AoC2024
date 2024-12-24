import "@total-typescript/ts-reset";
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
	return input.split("\n").map((line) => {
		return line.split(" ").map((d) => Number.parseInt(d));
	});
};

const checkSafetyWithDampener = (line: number[]) => {
	if (checkSafety(line)) {
		// already correct
		return true;
	}
	for (let index = 0; index < line.length; ++index) {
		const newLine = [...line.slice(0, index), ...line.slice(index + 1)];
		if (checkSafety(newLine)) {
			// correct after removing one element
			return true;
		}
	}
	// cannot be corrected
	return false;
};

export const checkReports = (input: string = defaultInput) => {
	const lines = mapInput(input);
	return lines.filter((line) => checkSafety(line)).length;
};

export const checkReportsWithDampener = (input: string = defaultInput) => {
	const lines = mapInput(input);
	return lines.filter((line) => checkSafetyWithDampener(line)).length;
};

const checkSafety = (line: number[]): boolean => {
	const diffs = line
		.slice(0, line.length - 1)
		.map((_val, index) => line[index] - line[index + 1]);
	return (
		diffs.every((v) => v > 0 && v <= 3) || diffs.every((v) => v < 0 && v >= -3)
	);
};

let partToExecute = checkReports;
if (values.part === "2") {
	partToExecute = checkReportsWithDampener;
}

if (values.defaultInput) {
	console.log(partToExecute());
}
