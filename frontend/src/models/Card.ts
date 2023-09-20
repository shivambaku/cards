export enum Suit {
  Spades = 'spades',
  Hearts = 'hearts',
  Clubs = 'clubs',
  Diamonds = 'diamonds',
}

export interface Card {
  name: string
  suit: Suit
  value: number
  rank: string
  isGhostCard?: boolean
  hasBeenPlayed?: boolean
}

export interface CardDeck<T> {
  cards: T[]
  shuffle: () => void
  draw: () => T
}
