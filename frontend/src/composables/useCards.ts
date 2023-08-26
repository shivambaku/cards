export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds',
}

export interface Card {
  suit: Suit
  value: number // 1-13
  img: string
}

export function useCards() {
  const suits: Suit[] = [Suit.Spades, Suit.Hearts, Suit.Clubs, Suit.Diamonds];

  function valueToRank(value: number) {
    switch (value) {
      case 1:
        return 'Ace';
      case 11:
        return 'Jack';
      case 12:
        return 'Queen';
      case 13:
        return 'King';
      default:
        return value;
    }
  }

  function shuffleDeck(deck: any[]) {
    let currentIndex = deck.length;
    let randomIndex;
    let tempValue;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      tempValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = tempValue;
    }

    return deck;
  }

  function createDeck(shuffle: boolean = false): Card[] {
    const cards = suits.flatMap((suit) => {
      return Array.from({ length: 13 }, (_, i) => {
        const value = i + 1;
        const rank = valueToRank(value).toString().toLowerCase();
        const img = `${rank}_of_${suit}.svg`;
        return { suit, value, img };
      });
    });

    if (shuffle)
      return shuffleDeck(cards);

    return cards;
  }

  return {
    createDeck,
    suits,
  };
}
