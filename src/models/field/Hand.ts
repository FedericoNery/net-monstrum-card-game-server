import { TYPE } from "../utils/enums.js";

interface Card {
  uniqueIdInGame: string;
  type: string;
  attackPoints: number;
  // ...other properties...
}

class Mano {
  private cartas: Card[];

  constructor(mano: Card[]) {
    this.cartas = mano;
  }

  setCartas(cartas: Card[]): void {
    this.cartas = cartas;
  }

  quitarCartas(listaIdsCartasAQuitar: string[]): void {
    const cartasADescartar = this.cartas.filter(card => !listaIdsCartasAQuitar.includes(card.uniqueIdInGame));
    this.setCartas(cartasADescartar);
  }

  getCartas(): Card[] {
    return this.cartas;
  }

  getLength(): number {
    return this.cartas.length;
  }

  clear(): void {
    this.cartas = [];
  }

  getCartasAInvocarFrom(listaIdsCartasAInvocar: string[]): Card[] {
    return this.cartas.filter(card => card.type === TYPE.DIGIMON && listaIdsCartasAInvocar.includes(card.uniqueIdInGame));
  }

  getCartasOrdenadasPorAtaque(): Card[] {
    return this.cartas
      .filter(card => card.type === TYPE.DIGIMON)
      .sort((a, b) => (a.attackPoints > b.attackPoints ? 1 : -1));
  }

  getCardById(cardId: string): Card | undefined {
    return this.cartas.find(x => x.uniqueIdInGame === cardId);
  }
}

export default Mano;
