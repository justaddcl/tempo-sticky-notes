import { test } from "node:test";
import assert from "node:assert/strict";
import type { ActiveDragRef, Note } from "../../../../types.ts";
import {
  calculateUpdatedCoordinates,
  clampValue,
} from "../calculateUpdatedCoordinates.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../constants.ts";

const noteFixture: Note = {
  id: "note-1",
  x: 100,
  y: 100,
  width: 100,
  height: 100,
};

const dragFixture: ActiveDragRef = {
  noteId: noteFixture.id,
  pointerId: 1,
  noteStartingX: noteFixture.x,
  noteStartingY: noteFixture.y,
  pointerStartingX: 130,
  pointerStartingY: 140,
};

test("clampValue throws when minimum exceeds maximum", () => {
  assert.throws(() => clampValue(7, 10, 5));
});

test("clampValue returns the minimum/maximum when they are the same value", () => {
  assert.equal(clampValue(5, 0, 0), 0);
});

test("clampValue returns minimum for a value below the range", () => {
  assert.equal(clampValue(-5, 0, 10), 0);
});

test("clampValue preserves a value within the range", () => {
  assert.equal(clampValue(5, 0, 10), 5);
});

test("clampValue returns maximum for a value above the range", () => {
  assert.equal(clampValue(15, 0, 10), 10);
});

test("coordinates follow positive pointer deltas within the board", () => {
  const result = calculateUpdatedCoordinates({
    clientX: 150,
    clientY: 170,
    activeDrag: dragFixture,
    activeNote: noteFixture,
  });
  assert.deepEqual(result, { x: 120, y: 130 });
});

test("coordinates follow negative pointer deltas within the board", () => {
  const result = calculateUpdatedCoordinates({
    clientX: 110,
    clientY: 110,
    activeDrag: dragFixture,
    activeNote: noteFixture,
  });
  assert.deepEqual(result, { x: 80, y: 70 });
});

test("coordinates stop at the board's right and bottom bounds", () => {
  const result = calculateUpdatedCoordinates({
    clientX: dragFixture.pointerStartingX + BOARD_WIDTH,
    clientY: dragFixture.pointerStartingY + BOARD_HEIGHT,
    activeDrag: dragFixture,
    activeNote: noteFixture,
  });
  assert.deepEqual(result, {
    x: BOARD_WIDTH - noteFixture.width,
    y: BOARD_HEIGHT - noteFixture.height,
  });
});
