import Hand from './Hand.js';
import Trash from './Trash.js';
import Deck from './Deck.js';
import DigimonZone from './DigimonZone.js';
import { obtenerEnergias, obtenerEnergiasYSumarlas } from '../../services/manoService.js';
import { COLOR } from '../../utils/enums.js';

interface Card {
  uniqueIdInGame: string;
  color: string;
  energyCount: number;
  tipo_energia: string;
  cantidad_energia: number;
  // ...other properties...
}

interface EnergyCounts {
  red: number;
  black: number;
  blue: number;
  brown: number;
  green: number;
  white: number;
}

class Field {
  public attackPoints: number;
  public healthPoints: number;
  public hand: Hand;
  public digimonZone: DigimonZone;
  public deck: Deck;
  public trash: Trash;
  public cantidadesEnergias: EnergyCounts | null;
  public isEnabledSummonDigimonWithOneEnergy: boolean;

  constructor(deckCards: Card[] = [], handCards: Card[] = [], zonaJuego: Card[] = [], trashCards: Card[] = []) {
    this.attackPoints = 0;
    this.healthPoints = 0;
    this.hand = new Hand(handCards);
    this.digimonZone = new DigimonZone(zonaJuego);
    this.deck = new Deck(deckCards);
    this.trash = new Trash(trashCards);
    this.cantidadesEnergias = null;
    this.isEnabledSummonDigimonWithOneEnergy = process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY === 'true';
  }

  // ...existing code with type annotations added...
}

export default Field;
