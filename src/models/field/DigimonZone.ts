interface Card {
  uniqueIdInGame: string;
  currentAttackPoints: number;
  currentHealthPoints: number;
}

interface EquipmentEffect {
  attackPoints: number;
  healthPoints: number;
}

class DigimonZone {
  private cartas: Card[];

  constructor(cartas: Card[] = []) {
    this.cartas = cartas;
  }

  setCartas(cartas: Card[]): void {
    this.cartas = cartas;
  }

  getCartas(): Card[] {
    return this.cartas;
  }

  getLength(): number {
    return this.cartas.length;
  }

  getAtaque(): number {
    if (this.getLength() > 0) {
      const ataques = this.cartas.map(x => x.currentAttackPoints);
      return ataques.reduce((x, y) => x + y, 0);
    }
    return 0;
  }

  getDefensa(): number {
    if (this.getLength() > 0) {
      const defensas = this.cartas.map(x => x.currentHealthPoints);
      return defensas.reduce((x, y) => x + y, 0);
    }
    return 0;
  }

  invocarCarta(carta: Card): void {
    this.cartas = [...this.cartas, carta];
  }

  clear(): void {
    this.cartas = [];
  }

  getCardById(cardId: string): Card | undefined {
    return this.cartas.find(x => x.uniqueIdInGame === cardId);
  }

  applyEquipmentEffectTo(cardDigimonId: string, effect: EquipmentEffect): void {
    const uniqueIds = this.cartas.map(x => x.uniqueIdInGame);
    const indexCard = uniqueIds.indexOf(cardDigimonId);
    if (indexCard !== -1) {
      this.cartas[indexCard].currentAttackPoints += effect.attackPoints;
      this.cartas[indexCard].currentHealthPoints += effect.healthPoints;
    }
  }
}

export default DigimonZone;
