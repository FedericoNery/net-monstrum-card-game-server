interface Card {
  uniqueIdInGame: string;
  // ...other properties...
}

class Deck {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  extractCard(): Card | undefined {
    if (this.cards.length > 0) {
      return this.cards.shift();
    }
  }

  extractCardsByQuantity(quantity: number): Card[] {
    const extractedCards: Card[] = [];
    for (let index = 0; index < quantity; index++) {
      const card = this.extractCard();
      if (card) {
        extractedCards.push(card);
      }
    }
    return extractedCards;
  }

  shuffle(): void {
    let j, x, i;
    for (i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = x;
    }
  }

  getLength(): number {
    return this.cards.length;
  }
}

export default Deck;
