import { describe, expect, it } from "bun:test";
import { part1, part2 } from "./solutions";

describe("Day 2", () => {
	it("Part One", async () => {
		const input = await Bun.file("test.txt").text();
		const res = part1(input);
		expect(res).toEqual(161);
	});
	it("Part Two", async () => {
		const input = await Bun.file("test2.txt").text();
		const res = part2(input);
		expect(res).toEqual(48);
	});
});
