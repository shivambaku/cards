export function isOverTarget(
  object: { x: number; y: number; width: number; height: number },
  target: { x: number; y: number; width: number; height: number },
) {
  const objectLeft = object.x;
  const objectRight = object.x + object.width;
  const objectTop = object.y;
  const objectBottom = object.y + object.height;

  const targetLeft = target.x;
  const targetRight = target.x + target.width;
  const targetTop = target.y;
  const targetBottom = target.y + target.height;

  return (
    objectLeft < targetRight
    && objectRight > targetLeft
    && objectTop < targetBottom
    && objectBottom > targetTop
  );
}
