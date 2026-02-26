interface Card {
  uniqueIdInGame: string;
  // ...other properties...
}

class Trash {
  private cartas: Card[];

  constructor(cartas: Card[]) {
    this.cartas = cartas;
  }

  agregarCarta(carta: Card): void {
    this.cartas.push(carta);
  }

  agregarCartas(cards: Card[]): void {
    for (const card of cards) {
      this.agregarCarta(card);
    }
  }
}

export default Trash;
