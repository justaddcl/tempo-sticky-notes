import type { ComponentPropsWithoutRef } from "react";
import "./StickyNote.css";

type StickyNoteProps = ComponentPropsWithoutRef<"div">;

export const StickyNote: React.FC<StickyNoteProps> = ({
  style,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerCancel,
}) => {
  return (
    <div
      className="sticky-note"
      style={style}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerCancel={onPointerCancel}
    />
  );
};
