import { describe, expect, it } from "bun:test";
import { checkReports, checkReportsWithDampener } from "./solutions";

describe("Day 2", () => {
	it("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = checkReports(input);
		expect(res).toEqual(2);
	});
	it("Part Two", async () => {
		const input = await Bun.file("test.txt").text();
		const res = checkReportsWithDampener(input);
		expect(res).toEqual(4);
	});
});
