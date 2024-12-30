import { parseArgs } from "node:util";
import path from "node:path";

declare global {
	interface Array<T> {
		sum(): T;
	}
}

Array.prototype.sum = function () {
	if (this.length === 0) {
		throw new Error("Array is empty");
	}

	const firstItem = this[0];
	if (typeof firstItem === "number") {
		return this.reduce((acc, val) => acc + val, 0);
	}
	if (typeof firstItem === "string") {
		return this.reduce((acc, val) => acc + val, "");
	}
	throw new Error("Unsupported array type");
};

declare global {
	interface String {
		parseNumbers(): number[];
	}
}
const digitsRegexp = /\d+/g;
String.prototype.parseNumbers = function () {
	if (this.length === 0) {
		throw new Error("String is empty");
	}
	return [...this.matchAll(digitsRegexp)].map((match) => Number(match[0]));
};

export const { values: argValues } = parseArgs({
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

function getDay(pathName: string) {
	const res = path.basename(path.resolve(pathName));
	return res.charAt(0).toUpperCase() + res.slice(1);
}

export const showResult = (result: number, part = 1): void => {
	const dayToDisplay = getDay(".");
	console.log("\x1b[33m%s\x1b[0m", `${dayToDisplay}, part ${part}: ${result}`);
};

export const measureExecutionTime = <T>(fn: () => T): void => {
	const startTimeNs = Bun.nanoseconds();
	fn();
	const endTimeNs = Bun.nanoseconds();
	const durationNs = endTimeNs - startTimeNs;
	console.log(`Duration: ${durationNs} nanoseconds`);
};
