import type { ComponentPropsWithRef } from "react";
import "./TrashZone.css";

type TrashZoneProps = ComponentPropsWithRef<"div"> & {
  isDragging: boolean;
};

export const TrashZone: React.FC<TrashZoneProps> = ({ ref, isDragging }) => {
  return (
    <div
      ref={ref}
      className="trash-zone"
      style={{ visibility: isDragging ? "visible" : "hidden" }}
    >
      <span>Delete note</span>
    </div>
  );
};
