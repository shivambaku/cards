import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Player } from '@/models/Player';
import { Suit } from '@/models/Card';
import type { Card, CardDeck } from '@/models/Card';
import { shuffle } from '@/utilities/shuffle';
import { sortCards } from '@/utilities/sortCards';

export interface JudgementGame {
  id: number
  players: JudgementGameplayer[]
  tableCards: Card[]
  deck: CardDeck<Card> | null
  currentRound: number
  currentTurmpIndex: number
  currentTurn: number
  currentCardCount: number
  upOrDownCoefficient: number
  gameFinished: boolean
  numberOfPlayers: number
}

export interface JudgementGameplayer extends Player {
  gameId: number
  game: JudgementGame
  playerCards: Card[]
  playerScore: number
}

export enum JudgementCardRanks {
  Ace = 14,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
}

export const useJudgementGame = defineStore('judgementGameStore', () => {
  const Suits: (Suit | 'No Trump')[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs, 'No Trump'];

  const judgementGame = ref<JudgementGame | null>({
    id: 1,
    players: [],
    deck: null,
    tableCards: [],
    currentRound: 0,
    currentCardCount: 0,
    currentTurmpIndex: 0,
    currentTurn: 0,
    upOrDownCoefficient: -1,
    gameFinished: false,
    numberOfPlayers: 0,
  });

  const currentTrump = computed(() => {
    return Suits[judgementGame.value!.currentTurmpIndex];
  });

  const tableCards = computed(() => {
    return judgementGame.value!.tableCards;
  });

  function generateCards(): Card[] {
    const cards: Card[] = [];
    for (const suit in Suit) {
      if (typeof Suit[suit as keyof typeof Suit] === 'string') {
        for (const rank in JudgementCardRanks) {
          if (typeof JudgementCardRanks[rank as keyof typeof JudgementCardRanks] === 'number') {
            cards.push({
              name: `${suit.toLowerCase()}_${rank.toLowerCase()}`,
              suit: Suit[suit as keyof typeof Suit],
              rank,
              value: JudgementCardRanks[rank as keyof typeof JudgementCardRanks],
              isGhostCard: false,
            });
          }
        }
      }
    }
    return cards;
  };

  function insertCard(card: Card, index: number, player?: JudgementGameplayer, isGhostCard?: boolean) {
    const newCard = {
      name: card.name,
      suit: card.suit,
      rank: card.rank,
      value: card.value,
      isGhostCard: isGhostCard || false,
    };

    if (player)
      player.playerCards.splice(index, 0, newCard);
  }

  function generateDeck() {
    const cards: Card[] = generateCards();
    const deck: CardDeck<Card> = {
      cards,
      shuffle: shuffle.bind(null, cards),
      draw: () => {
        return deck.cards.pop()!;
      },
    };
    judgementGame.value!.deck = deck;
  }

  function setPlayers(numberOfPlayers: number) {
    judgementGame.value!.numberOfPlayers = numberOfPlayers;
    const players: JudgementGameplayer[] = [];
    for (let i = 0; i < judgementGame.value!.numberOfPlayers; i++) {
      players.push({
        id: i,
        userName: `Player ${i}`,
        gameId: 1,
        game: judgementGame.value!,
        playerCards: [],
        playerScore: 0,
      });
    }
    judgementGame.value!.players = players;
  }

  function determineInitialPlayerCardNumber(): void {
    judgementGame.value!.currentCardCount = Math.floor(52 / judgementGame.value!.players.length);
  }

  function dealCards() {
    judgementGame.value!.deck?.shuffle();
    judgementGame.value!.players.forEach((player) => {
      if (!judgementGame.value!.deck)
        throw new Error('Deck is null');
      for (let i = 0; i < judgementGame.value!.currentCardCount; i++)
        player.playerCards.push(judgementGame.value!.deck.draw());
      // sort deck by value and suit in ascending order
      sortCards(player.playerCards);
    });
  }

  function setCurrentCardCount() {
    if (judgementGame.value!.currentCardCount === 1)
      judgementGame.value!.upOrDownCoefficient = 1;
    judgementGame.value!.currentCardCount += judgementGame.value!.upOrDownCoefficient;
  }

  function setCurrentTurn() {
    if (judgementGame.value!.currentRound === 1) {
      judgementGame.value!.currentTurn = 0;
    }
    else {
      while (!judgementGame.value!.gameFinished) {
        if (judgementGame.value!.currentTurn === judgementGame.value!.players.length)
          judgementGame.value!.currentTurn = 0;
        judgementGame.value!.currentTurn++;
      }
    }
  }

  function setCurrentTrump() {
    while (!judgementGame.value!.gameFinished) {
      if (judgementGame.value!.currentTurmpIndex === Suits.length)
        judgementGame.value!.currentTurmpIndex = 0;
      else
        judgementGame.value!.currentTurmpIndex++;
    }
  }
  function startGame(numberOfPlayers: number) {
    generateCards();
    generateDeck();
    setPlayers(numberOfPlayers);
    determineInitialPlayerCardNumber();
    dealCards();
    judgementGame.value!.currentRound = 1;
    judgementGame.value!.currentTurn = 0;
  }

  function nextRound() {
    judgementGame.value!.currentRound++;
    setCurrentTurn();
    setCurrentCardCount();
    setCurrentTrump();
    generateDeck();
    dealCards();
  }

  return {
    judgementGame,
    currentTrump,
    tableCards,
    startGame,
    nextRound,
    insertCard,
  };
});
