export type Note = {
  id: string;
  height: number;
  width: number;
  x: number;
  y: number;
};

export type ActiveDragRef = {
  pointerId: number;
  noteId: Note["id"];
  noteStartingX: Note["x"];
  noteStartingY: Note["y"];
  pointerStartingX: number;
  pointerStartingY: number;
};
