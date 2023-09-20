export function getCardRotationDegrees(totalCards: number, cardPosition: number): number {
  if (totalCards === 1)
    return 0;

  const maxRotation = 20;
  const delta = (2 * maxRotation) / (totalCards - 1);
  const returnVal = cardPosition * delta - maxRotation;
  return Math.floor(returnVal);
}
