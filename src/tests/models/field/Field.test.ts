import Field from '../../../models/field/Field';
import Hand from '../../../models/field/Hand';
import Deck from '../../../models/field/Deck';
import Trash from '../../../models/field/Trash';
import DigimonZone from '../../../models/field/DigimonZone';

describe('Field', () => {
  const originalEnv = process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY;
      return;
    }
    process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY = originalEnv;
  });

  it('inicializa con valores por defecto cuando no se pasan cartas', () => {
    delete process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY;
    const field = new Field();

    expect(field.attackPoints).toBe(0);
    expect(field.healthPoints).toBe(0);
    expect(field.cantidadesEnergias).toBeNull();
    expect(field.isEnabledSummonDigimonWithOneEnergy).toBe(false);
    expect(field.hand).toBeInstanceOf(Hand);
    expect(field.deck).toBeInstanceOf(Deck);
    expect(field.trash).toBeInstanceOf(Trash);
    expect(field.digimonZone).toBeInstanceOf(DigimonZone);
    expect(field.hand.getLength()).toBe(0);
    expect(field.deck.getLength()).toBe(0);
    expect(field.digimonZone.getLength()).toBe(0);
    expect((field.trash as any).cartas).toEqual([]);
  });

  it('inicializa zonas con cartas y bandera de entorno habilitada', () => {
    process.env.ENABLE_SUMMON_DIGIMON_WITH_ONE_ENERGY = 'true';
    const deckCards = [{ uniqueIdInGame: 'd1', color: 'Red', energyCount: 0, tipo_energia: '', cantidad_energia: 0 }];
    const handCards = [{ uniqueIdInGame: 'h1', color: 'Blue', energyCount: 1, tipo_energia: '', cantidad_energia: 0 }];
    const zoneCards = [{ uniqueIdInGame: 'z1', color: 'Green', energyCount: 2, tipo_energia: '', cantidad_energia: 0 }];
    const trashCards = [{ uniqueIdInGame: 't1', color: 'Black', energyCount: 3, tipo_energia: '', cantidad_energia: 0 }];

    const field = new Field(deckCards, handCards, zoneCards as any, trashCards);

    expect(field.isEnabledSummonDigimonWithOneEnergy).toBe(true);
    expect(field.deck.getLength()).toBe(1);
    expect(field.hand.getLength()).toBe(1);
    expect(field.digimonZone.getLength()).toBe(1);
    expect((field.trash as any).cartas).toEqual(trashCards);
  });
});
