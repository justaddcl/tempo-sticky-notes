import { useState } from "react";
import { type Note } from "../../types";
import { ControlPanel } from "../ControlPanel";
import { StickyNote } from "../StickyNote";
import { useNoteDragging } from "./hooks/useNoteDragging";
import "./StickiesBoard.css";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./utils/constants";
import { TrashZone } from "../TrashZone";

export const StickiesBoard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const {
    onNotePointerDown,
    onNotePointerUp,
    onNotePointerMove,
    onNotePointerCancel,
    trashZoneRef,
    isDragging,
  } = useNoteDragging(notes, setNotes);

  return (
    <div className="container">
      <ControlPanel
        onCreate={(newNote) => {
          setNotes((currentNotes) => [...currentNotes, newNote]);
        }}
      />
      <div
        className="stickies-board"
        style={{ width: `${BOARD_WIDTH}px`, height: `${BOARD_HEIGHT}px` }}
      >
        <TrashZone ref={trashZoneRef} isDragging={isDragging} />
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
    </div>
  );
};
