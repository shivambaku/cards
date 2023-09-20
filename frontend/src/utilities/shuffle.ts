// shuffle a deck of cards with Fisher-Yates
export function shuffle<T>(cards: T[]): void {
  let currentIndex = cards.length;
  let temporaryValue: T;
  let randomIndex: number;
  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}
