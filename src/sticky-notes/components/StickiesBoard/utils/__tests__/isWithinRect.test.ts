import { test } from "node:test";
import assert from "node:assert/strict";
import { isWithinRect } from "../isWithinRect.ts";

const rectFixture: DOMRect = {
  x: 100,
  y: 200,
  width: 100,
  height: 100,
  left: 100,
  right: 200,
  top: 200,
  bottom: 300,
  toJSON: () => ({}),
};

test("isWithinRect returns true when both coordinates are inside", () => {
  assert.equal(isWithinRect({ x: 150, y: 250, rect: rectFixture }), true);
});

test("isWithinRect returns false when only x is inside", () => {
  assert.equal(isWithinRect({ x: 150, y: 350, rect: rectFixture }), false);
});

test("isWithinRect returns false when only y is inside", () => {
  assert.equal(isWithinRect({ x: 250, y: 250, rect: rectFixture }), false);
});

test("isWithinRect returns false when both coordinates are outside", () => {
  assert.equal(isWithinRect({ x: 250, y: 350, rect: rectFixture }), false);
});
