import type { ActiveDragRef, Note } from "../../../types.ts";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./constants.ts";

const MIN_X_COORDINATE = 0;
const MIN_Y_COORDINATE = 0;

export const clampValue = (
  value: number,
  minValue: number,
  maxValue: number,
) => {
  if (minValue > maxValue) {
    throw new Error("Min value must not exceed the max value");
  }

  if (value < minValue) {
    return minValue;
  }

  if (value > maxValue) {
    return maxValue;
  }

  return value;
};

export const calculateUpdatedCoordinates = ({
  clientX,
  clientY,
  activeDrag,
  activeNote,
}: {
  clientX: React.PointerEvent<HTMLDivElement>["clientX"];
  clientY: React.PointerEvent<HTMLDivElement>["clientY"];
  activeDrag: ActiveDragRef;
  activeNote: Note;
}): { x: number; y: number } => {
  const deltaX = clientX - activeDrag.pointerStartingX;
  const deltaY = clientY - activeDrag.pointerStartingY;

  const updatedX = activeDrag.noteStartingX + deltaX;
  const updatedY = activeDrag.noteStartingY + deltaY;

  const maxX = BOARD_WIDTH - activeNote.width;
  const maxY = BOARD_HEIGHT - activeNote.height;

  return {
    x: clampValue(updatedX, MIN_X_COORDINATE, maxX),
    y: clampValue(updatedY, MIN_Y_COORDINATE, maxY),
  };
};
