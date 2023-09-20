import { Suit } from '@/models/Card';
import type { Card } from '@/models/Card';

export function sortCards(cards: Card[]) {
  cards.sort((a, b) => {
    if (a.suit !== b.suit) {
      // Convert enum to an array and find the index of each suit
      const suitsOrder = [Suit.Clubs, Suit.Diamonds, Suit.Hearts, Suit.Spades];
      return suitsOrder.indexOf(a.suit) - suitsOrder.indexOf(b.suit);
    }
    // If suits are the same, compare values
    return a.value - b.value;
  });
}
