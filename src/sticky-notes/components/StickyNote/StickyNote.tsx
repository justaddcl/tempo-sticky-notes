import type { ComponentPropsWithoutRef } from "react";
import "./StickyNote.css";

const DEFAULT_STICKY_COLOR = "#FFEBA1";

type StickyNoteProps = ComponentPropsWithoutRef<"div">;

export const StickyNote: React.FC<StickyNoteProps> = ({ style }) => {
  return (
    <div
      className="sticky-note"
      style={{ backgroundColor: DEFAULT_STICKY_COLOR, ...style }}
    />
  );
};
