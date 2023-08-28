import { ref } from 'vue';
import { type Card, Suit, useCards } from './useCards';
import type { Player } from '@/models/player';

export interface JudgementPlayer extends Player {
  cards: Card[]
  score: number
  bid: number
  tricks: number
}

export interface JudgementGameState {
  players: JudgementPlayer[]
  currentTrump: Suit | 'No Trump'
  currentCardCount: number
  upOrDownCoefficient: number
  maxAmountOfCards: number
  gameFinished: boolean
}

export function useJudgementGame(numberOfPlayers: number) {
  const { createDeck } = useCards();

  const trumpOrder: (Suit | 'No Trump')[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs, 'No Trump'];

  function createPlayers(numberOfPlayers: number) {
    const players: JudgementPlayer[] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push({
        id: i,
        name: `Player ${i + 1}`,
        cards: [],
        score: 0,
        bid: 0,
        tricks: 0,
      });
    }
    return players;
  }

  const gameState = ref<JudgementGameState>({
    players: createPlayers(numberOfPlayers),
    currentTrump: Suit.Spades,
    maxAmountOfCards: Math.floor(52 / numberOfPlayers),
    currentCardCount: Math.floor(52 / numberOfPlayers),
    upOrDownCoefficient: -1,
    gameFinished: false,
  });

  function valueToValue(value: number) {
    return value === 1 ? 14 : value;
  }

  function dealCards() {
    const cards = createDeck(true);

    for (let j = 0; j < gameState.value.players.length; j++) {
      gameState.value.players[j].cards = [];
      for (let i = 0; i < gameState.value.currentCardCount; i++)
        gameState.value.players[j].cards.push(cards.pop()!);

      gameState.value.players[j].cards.sort((a, b) => {
        if (a.suit === b.suit)
          return valueToValue(a.value) - valueToValue(b.value);
        return a.suit.localeCompare(b.suit);
      });
    }
  }

  function newRound() {
    dealCards();
  }

  function roundFinished() {
    if (gameState.value.currentCardCount === gameState.value.maxAmountOfCards
      && gameState.value.upOrDownCoefficient === 1) {
      gameState.value.gameFinished = true;
      return;
    }

    const currentTrumpIndex = trumpOrder.indexOf(gameState.value.currentTrump);
    const nextTrumpIndex = (currentTrumpIndex + 1) % trumpOrder.length;
    gameState.value.currentTrump = trumpOrder[nextTrumpIndex];

    if (gameState.value.currentCardCount === 1)
      gameState.value.upOrDownCoefficient = 1;

    gameState.value.currentCardCount += gameState.value.upOrDownCoefficient;

    newRound();
  }

  return {
    gameState,
    newRound,
    roundFinished,
  };
}
