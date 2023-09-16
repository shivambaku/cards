import { computed, ref } from 'vue';
import { type Card, Suit, useCards } from './useCards';
import type { Player } from '@/models/player';

export interface JudgementPlayer extends Player {
  score: number
}

export interface JudgementGameState {
  players: JudgementPlayer[]
  upOrDownCoefficient: number
  maxAmountOfCards: number
  gameFinished: boolean
  rounds: JudgementRound[]
}

export interface JudgementRound {
  currentDealer: JudgementPlayer
  currentCardCount: number
  currentTrump: Suit | 'No Trump'
  currentCallPlayer: JudgementPlayer
  state: 'Calling' | 'Playing' | 'Finished'
  turns: JudgementTurn[]
  calls: JudgementRoundCall[]
  hands: JudgementRoundHand[]
}

export interface JudgementRoundCall {
  player: JudgementPlayer
  call: number
  tricks: number
}

export interface JudgementRoundHand {
  player: JudgementPlayer
  cards: Card[]
}

export interface JudgementTurn {
  currentPlayPlayer: JudgementPlayer
  plays: JudgementTurnPlay[]
  winner?: JudgementPlayer
}

export interface JudgementTurnPlay {
  player: JudgementPlayer
  card: Card
}

export function useJudgementGame(numberOfPlayers: number) {
  const { createDeck } = useCards();

  const trumpOrder: (Suit | 'No Trump')[] = [Suit.Spades, Suit.Hearts, Suit.Diamonds, Suit.Clubs, 'No Trump'];

  function createPlayers(numberOfPlayers: number) {
    const players: JudgementPlayer[] = [];
    for (let i = 0; i < numberOfPlayers; i++) {
      players.push({
        id: i,
        name: `Player ${i}`,
        score: 0,
      });
    }
    return players;
  }

  const players = createPlayers(numberOfPlayers);

  const gameState = ref<JudgementGameState>({
    players,
    maxAmountOfCards: Math.floor(52 / numberOfPlayers),
    upOrDownCoefficient: -1,
    gameFinished: false,
    rounds: [
      {
        currentDealer: players[0],
        currentCardCount: Math.floor(52 / numberOfPlayers),
        currentTrump: Suit.Spades,
        currentCallPlayer: players[1],
        state: 'Calling',
        calls: [],
        hands: [],
        turns: [{
          currentPlayPlayer: players[1],
          plays: [],
        }],
      },
    ],
  });

  const totalRounds = computed(() => {
    return gameState.value.maxAmountOfCards * 2 - 1;
  });

  const roundsPlayed = computed(() => {
    return gameState.value.rounds.length;
  });

  const currentRound = computed(() => {
    return gameState.value.rounds[gameState.value.rounds.length - 1];
  });

  const currentTurn = computed(() => {
    return currentRound.value.turns[currentRound.value.turns.length - 1];
  });

  function cardValueToJudgementCardValue(value: number) {
    return value === 1 ? 14 : value;
  }

  function dealCards() {
    const cards = createDeck(true);

    for (let j = 0; j < gameState.value.players.length; j++) {
      const hand: JudgementRoundHand = {
        player: gameState.value.players[j],
        cards: [],
      };

      currentRound.value.hands.push(hand);

      for (let i = 0; i < currentRound.value.currentCardCount; i++)
        hand.cards.push(cards.pop()!);

      hand.cards.sort((a, b) => {
        if (a.suit === b.suit)
          return cardValueToJudgementCardValue(a.value) - cardValueToJudgementCardValue(b.value);
        return a.suit.localeCompare(b.suit);
      });
    }
  }

  function makeCall(call: JudgementRoundCall) {
    if (call.player !== currentRound.value.currentCallPlayer)
      throw new Error(`It is not ${call.player}'s turn to call`);

    if (call.call < 0 || call.call > currentRound.value.currentCardCount)
      throw new Error(`${call.player} cannot call ${call.call}`);

    const isLastPersonToCall = currentRound.value.calls.length === gameState.value.players.length - 1;
    const totalBidSoFar = currentRound.value.calls.reduce((total, call) => total + call.call, 0);

    if (isLastPersonToCall && call.call + totalBidSoFar === currentRound.value.currentCardCount)
      throw new Error(`${call.player} cannot call ${call.call}`);

    currentRound.value.calls.push(call);

    if (isLastPersonToCall) {
      currentRound.value.state = 'Playing';
      return;
    }

    const currentCallPlayerIndex = gameState.value.players.indexOf(currentRound.value.currentCallPlayer);
    const nextCallPlayer = gameState.value.players[(currentCallPlayerIndex + 1) % gameState.value.players.length];
    currentRound.value.currentCallPlayer = nextCallPlayer;
  }

  function playCard(play: JudgementTurnPlay) {
    if (play.player !== currentTurn.value.currentPlayPlayer)
      throw new Error(`It is not ${play.player}'s turn`);

    const hand = currentRound.value.hands.find(h => h.player === play.player)!;

    if (!hand.cards.includes(play.card))
      throw new Error(`${play.player} does not have the ${play.card}`);

    if (hand.cards.some(c => c.suit === currentTurn.value.plays[0].card.suit) && play.card.suit !== currentTurn.value.plays[0].card.suit)
      throw new Error(`${play.player} must follow suit`);

    currentTurn.value.plays.push(play);
    hand.cards.splice(hand.cards.indexOf(play.card), 1);

    const isLastPersonToPlay = currentTurn.value.plays.length === gameState.value.players.length;

    if (isLastPersonToPlay)
      return finishTurn();

    const currentPlayPlayerIndex = gameState.value.players.indexOf(currentTurn.value.currentPlayPlayer);
    const nextPlayPlayer = gameState.value.players[currentPlayPlayerIndex + 1];
    currentTurn.value.currentPlayPlayer = nextPlayPlayer;
  }

  function finishTurn() {
    const winner = currentTurn.value.plays.reduce((winner, play) => {
      if (play.card.suit === currentRound.value.currentTrump && winner.card.suit !== currentRound.value.currentTrump)
        return play;

      if (play.card.suit === winner.card.suit && play.card.value > winner.card.value)
        return play;

      return winner;
    });

    currentTurn.value.winner = winner.player;

    const winnerCall = currentRound.value.calls.find(c => c.player === winner.player)!;
    winnerCall.tricks++;

    const isLastTurn = currentRound.value.turns.length === currentRound.value.currentCardCount;
    if (isLastTurn)
      return finishRound();

    const nextTurn: JudgementTurn = {
      currentPlayPlayer: currentTurn.value.winner!,
      plays: [],
    };

    currentRound.value.turns.push(nextTurn);
  }

  function computeScores() {
    currentRound.value.calls.forEach((call) => {
      if (call.tricks === call.call)
        call.player.score += 10 * call.call;
    });
  }

  function finishRound() {
    computeScores();

    currentRound.value.state = 'Finished';

    if (currentRound.value.currentCardCount === gameState.value.maxAmountOfCards && gameState.value.upOrDownCoefficient === 1) {
      gameState.value.gameFinished = true;
      return;
    }

    if (currentRound.value.currentCardCount === 1)
      gameState.value.upOrDownCoefficient = 1;

    const currentTrumpIndex = trumpOrder.indexOf(currentRound.value.currentTrump);
    const currentDealerIndex = gameState.value.players.indexOf(currentRound.value.currentDealer);

    const nextTrump = trumpOrder[(currentTrumpIndex + 1) % trumpOrder.length];
    const nextDealer = gameState.value.players[(currentDealerIndex + 1) % gameState.value.players.length];
    const nextCallAndTurnPlayer = gameState.value.players[(currentDealerIndex + 2) % gameState.value.players.length];

    const nextRound: JudgementRound = {
      currentCardCount: currentRound.value.currentCardCount + gameState.value.upOrDownCoefficient,
      currentTrump: nextTrump,
      currentDealer: nextDealer,
      currentCallPlayer: nextCallAndTurnPlayer,
      state: 'Calling',
      turns: [{
        currentPlayPlayer: nextCallAndTurnPlayer,
        plays: [],

      }],
      calls: [],
      hands: [],
    };

    gameState.value.rounds.push(nextRound);
  }

  return {
    gameState,
    totalRounds,
    roundsPlayed,
    currentRound,
    currentTurn,
    dealCards,
    makeCall,
    playCard,
    finishRound,
  };
}
