export const isWithinRect = ({
  x,
  y,
  rect,
}: {
  x: React.PointerEvent["clientX"];
  y: React.PointerEvent["clientY"];
  rect: DOMRect;
}): boolean => {
  const isWithinX = x >= rect.left && x <= rect.right;
  const isWithinY = y >= rect.top && y <= rect.bottom;

  return isWithinX && isWithinY;
};
