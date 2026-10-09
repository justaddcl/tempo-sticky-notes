import { useRef, type Dispatch, type SetStateAction } from "react";
import type { ActiveDragRef, Note } from "../../../types";
import { calculateUpdatedCoordinates } from "../utils/calculateUpdatedCoordinates";

export const useNoteDragging = (
  notes: Note[],
  setNotes: Dispatch<SetStateAction<Note[]>>,
) => {
  const activeDragRef = useRef<ActiveDragRef>(null);

  const onNotePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    noteId: string,
  ) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    const activeNote = notes.find((note) => note.id === noteId);

    if (!activeNote) {
      return;
    }

    const { x: noteStartingX, y: noteStartingY } = activeNote;

    activeDragRef.current = {
      pointerId: event.pointerId,
      noteId: activeNote.id,
      noteStartingX,
      noteStartingY,
      pointerStartingX: event.clientX,
      pointerStartingY: event.clientY,
    };
  };

  const onNotePointerUp = () => {
    activeDragRef.current = null;
  };

  const onNotePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeDrag = activeDragRef?.current;

    if (!activeDrag) {
      return;
    }

    const activeNoteIndex = notes.findIndex(
      (note) => note.id === activeDrag.noteId,
    );

    if (activeNoteIndex === -1) {
      return;
    }

    const { x, y } = calculateUpdatedCoordinates({
      clientX: event.clientX,
      clientY: event.clientY,
      activeDrag,
      activeNote: notes[activeNoteIndex],
    });

    const updatedNote: Note = {
      ...notes[activeNoteIndex],
      x,
      y,
    };

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === activeDrag.noteId ? updatedNote : note,
      ),
    );
  };

  const onNotePointerCancel = () => {
    activeDragRef.current = null;
  };

  return {
    onNotePointerDown,
    onNotePointerUp,
    onNotePointerMove,
    onNotePointerCancel,
  };
};
