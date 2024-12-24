import { describe, expect, it } from "bun:test";
import { findDistance, findSimilarity } from "./solutions";

describe("Day 1", () => {
	it("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = findDistance(input);
		expect(res).toEqual(11);
	});

	it("Part Two", async () => {
		const input = await Bun.file("test.txt").text();
		const res = findSimilarity(input);
		expect(res).toEqual(31);
	});
});
