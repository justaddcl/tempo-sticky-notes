import { useState } from "react";
import "./StickiesBoard.css";
import { type Note } from "../../types";
import { StickyNote } from "../StickyNote";
import { StickyCreator } from "../StickyCreator";

export const BOARD_WIDTH = 900;
export const BOARD_HEIGHT = 600;

export const StickiesBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <div
      className="stickies-board"
      style={{ width: `${BOARD_WIDTH}px`, height: `${BOARD_HEIGHT}px` }}
    >
      <StickyCreator
        onCreate={(newNote) => {
          setNotes((currentNotes) => [...currentNotes, newNote]);
        }}
      />
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          style={{
            left: note.x,
            top: note.y,
            width: note.width,
            height: note.height,
          }}
        />
      ))}
    </div>
  );
};
