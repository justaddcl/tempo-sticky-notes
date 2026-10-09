import { useState } from "react";
import { type Note } from "../../types";
import { StickyCreator } from "../StickyCreator";
import { StickyNote } from "../StickyNote";
import { useNoteDragging } from "./hooks/useNoteDragging";
import "./StickiesBoard.css";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./utils/constants";

export const StickiesBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const {
    onNotePointerDown,
    onNotePointerUp,
    onNotePointerMove,
    onNotePointerCancel,
  } = useNoteDragging(notes, setNotes);

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
          onPointerDown={(event) => onNotePointerDown(event, note.id)}
          onPointerUp={onNotePointerUp}
          onPointerMove={onNotePointerMove}
          onPointerCancel={onNotePointerCancel}
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
