import { useRef, useState, type Dispatch, type SetStateAction } from "react";
import type { ActiveDragRef, Note } from "../../../types";
import { calculateUpdatedCoordinates } from "../utils/calculateUpdatedCoordinates";
import { isWithinRect } from "../utils/isWithinRect";

export const useNoteDragging = (
  notes: Note[],
  setNotes: Dispatch<SetStateAction<Note[]>>,
) => {
  const activeDragRef = useRef<ActiveDragRef>(null);
  const trashZoneRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const onNotePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    noteId: string,
  ) => {
    // don't start a drag event if it's not a left (primary) click
    if (event.button !== 0) {
      return;
    }

    const activeNote = notes.find((note) => note.id === noteId);

    if (!activeNote) {
      return;
    }

    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);

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

  const onNotePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeDrag = activeDragRef?.current;
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) {
      return;
    }

    const trashZone = trashZoneRef.current;

    if (trashZone) {
      if (
        isWithinRect({
          x: event.clientX,
          y: event.clientY,
          rect: trashZone.getBoundingClientRect(),
        })
      ) {
        setNotes((notes) =>
          notes.filter((note) => note.id !== activeDrag.noteId),
        );
      }
      trashZone.style.backgroundColor = "#fef2f2";
    }

    setIsDragging(false);
    activeDragRef.current = null;
  };

  const onNotePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const activeDrag = activeDragRef?.current;

    if (!activeDrag) {
      return;
    }

    const activeNote = notes.find((note) => note.id === activeDrag.noteId);

    if (!activeNote) {
      return;
    }

    const trashZone = trashZoneRef.current;

    if (trashZone) {
      const isOverTrashZone = isWithinRect({
        x: event.clientX,
        y: event.clientY,
        rect: trashZone.getBoundingClientRect(),
      });

      trashZone.style.backgroundColor = isOverTrashZone ? "#fca5a5" : "#fef2f2";
    }

    const { x, y } = calculateUpdatedCoordinates({
      clientX: event.clientX,
      clientY: event.clientY,
      activeDrag,
      activeNote,
    });

    const updatedNote: Note = {
      ...activeNote,
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
    if (trashZoneRef.current) {
      trashZoneRef.current.style.backgroundColor = "#fef2f2";
    }

    setIsDragging(false);
    activeDragRef.current = null;
  };

  return {
    onNotePointerDown,
    onNotePointerUp,
    onNotePointerMove,
    onNotePointerCancel,
    trashZoneRef,
    isDragging,
  };
};
