import { useState } from "react";
import type { Note } from "../../types";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../StickiesBoard/utils/constants";

const DEFAULT_STICKY_WIDTH = 100;
const DEFAULT_STICKY_HEIGHT = 100;
const DEFAULT_STICKY_X_POSITION = 24;
const DEFAULT_STICKY_Y_POSITION = 24;

type StickyCreatorProps = {
  onCreate: (newNote: Note) => void;
};
export const StickyCreator: React.FC<StickyCreatorProps> = ({ onCreate }) => {
  const [width, setWidth] = useState(DEFAULT_STICKY_WIDTH);
  const [height, setHeight] = useState(DEFAULT_STICKY_HEIGHT);

  const [x, setX] = useState(DEFAULT_STICKY_X_POSITION);
  const [y, setY] = useState(DEFAULT_STICKY_Y_POSITION);

  const createNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      width,
      height,
      x,
      y,
    };

    onCreate(newNote);
  };

  return (
    <div>
      <button onClick={() => createNote()}>+</button>
      <form>
        <label htmlFor="width">Width</label>
        <input
          id="width"
          type="number"
          value={width}
          onChange={(event) => setWidth(Number(event.target.value))}
        />
        <label htmlFor="height">Height</label>
        <input
          id="height"
          type="number"
          value={height}
          onChange={(event) => setHeight(Number(event.target.value))}
        />
        <label htmlFor="x">X Coordinate</label>
        <input
          id="x"
          type="number"
          value={x}
          onChange={(event) => setX(Number(event.target.value))}
          min={0}
          max={BOARD_WIDTH - width}
        />
        <label htmlFor="y">Y Coordinate</label>
        <input
          id="y"
          type="number"
          value={y}
          onChange={(event) => setY(Number(event.target.value))}
          min={0}
          max={BOARD_HEIGHT - height}
        />
      </form>
    </div>
  );
};
