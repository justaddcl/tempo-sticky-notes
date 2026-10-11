import { useState } from "react";
import type { Note } from "../../types";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../StickiesBoard/utils/constants";
import "./ControlPanel.css";

const DEFAULT_STICKY_WIDTH = 100;
const DEFAULT_STICKY_HEIGHT = 100;
const DEFAULT_STICKY_X_POSITION = 24;
const DEFAULT_STICKY_Y_POSITION = 24;
const MIN_NOTE_WIDTH = 10;
const MAX_NOTE_WIDTH = BOARD_WIDTH;
const MIN_NOTE_HEIGHT = 10;
const MAX_NOTE_HEIGHT = BOARD_HEIGHT;
const MIN_POSITION_VALUE = 0;

type ControlPanel = {
  onCreate: (newNote: Note) => void;
};

export const ControlPanel: React.FC<ControlPanel> = ({ onCreate }) => {
  const [width, setWidth] = useState(DEFAULT_STICKY_WIDTH);
  const [height, setHeight] = useState(DEFAULT_STICKY_HEIGHT);

  const [x, setX] = useState(DEFAULT_STICKY_X_POSITION);
  const [y, setY] = useState(DEFAULT_STICKY_Y_POSITION);

  const createNote = (event: React.SubmitEvent) => {
    event.preventDefault();

    // Native HTML input constraints validate the form before this submit handler runs.
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
    <div className="panel-container">
      <div>
        <div className="note-pad-hero">Note pad</div>
        <p>Drag notes to move them</p>
        <p>Release note over trash to delete</p>
      </div>
      <div className="control-panel">
        <form
          onSubmit={(event) => createNote(event)}
          className="control-panel-form"
        >
          <div className="control-panel-form-section">
            <span className="control-panel-form-section-title">Size</span>
            <div className="control-panel-form-control">
              <label htmlFor="width">Width</label>
              <input
                id="width"
                type="number"
                value={width}
                onChange={(event) => setWidth(Number(event.target.value))}
                min={MIN_NOTE_WIDTH}
                max={MAX_NOTE_WIDTH}
              />
            </div>
            <div className="control-panel-form-control">
              <label htmlFor="height">Height</label>
              <input
                id="height"
                type="number"
                value={height}
                onChange={(event) => setHeight(Number(event.target.value))}
                min={MIN_NOTE_HEIGHT}
                max={MAX_NOTE_HEIGHT}
              />
            </div>
          </div>
          <div className="control-panel-form-section">
            <span className="control-panel-form-section-title">Position</span>
            <div className="control-panel-form-control">
              <label htmlFor="x">X</label>
              <input
                id="x"
                type="number"
                value={x}
                onChange={(event) => setX(Number(event.target.value))}
                min={MIN_POSITION_VALUE}
                max={BOARD_WIDTH - width}
              />
            </div>
            <div className="control-panel-form-control">
              <label htmlFor="y">Y</label>
              <input
                id="y"
                type="number"
                value={y}
                onChange={(event) => setY(Number(event.target.value))}
                min={MIN_POSITION_VALUE}
                max={BOARD_HEIGHT - height}
              />
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};
