import DigimonZone from '../../../models/field/DigimonZone';

type ZoneCard = {
  uniqueIdInGame: string;
  currentAttackPoints: number;
  currentHealthPoints: number;
};

const createZoneCard = (overrides: Partial<ZoneCard> = {}): ZoneCard => ({
  uniqueIdInGame: overrides.uniqueIdInGame ?? 'id',
  currentAttackPoints: overrides.currentAttackPoints ?? 0,
  currentHealthPoints: overrides.currentHealthPoints ?? 0,
});

describe('DigimonZone', () => {
  it('getAtaque y getDefensa devuelven 0 cuando no hay cartas', () => {
    const zone = new DigimonZone();

    expect(zone.getAtaque()).toBe(0);
    expect(zone.getDefensa()).toBe(0);
  });

  it('getAtaque y getDefensa suman los valores de todas las cartas', () => {
    const zone = new DigimonZone([
      createZoneCard({ uniqueIdInGame: 'a', currentAttackPoints: 10, currentHealthPoints: 5 }),
      createZoneCard({ uniqueIdInGame: 'b', currentAttackPoints: 15, currentHealthPoints: 7 }),
    ]);

    expect(zone.getAtaque()).toBe(25);
    expect(zone.getDefensa()).toBe(12);
  });

  it('invocarCarta agrega una carta a la zona', () => {
    const zone = new DigimonZone([]);

    zone.invocarCarta(createZoneCard({ uniqueIdInGame: 'new' }));

    expect(zone.getLength()).toBe(1);
    expect(zone.getCardById('new')).toBeDefined();
  });

  it('clear vacia la zona', () => {
    const zone = new DigimonZone([createZoneCard({ uniqueIdInGame: 'a' })]);

    zone.clear();

    expect(zone.getCartas()).toEqual([]);
    expect(zone.getLength()).toBe(0);
  });

  it('applyEquipmentEffectTo actualiza ataque y defensa de la carta objetivo', () => {
    const zone = new DigimonZone([
      createZoneCard({ uniqueIdInGame: 'a', currentAttackPoints: 10, currentHealthPoints: 10 }),
    ]);

    zone.applyEquipmentEffectTo('a', { attackPoints: 4, healthPoints: 2 });

    expect(zone.getCardById('a')).toEqual(
      createZoneCard({ uniqueIdInGame: 'a', currentAttackPoints: 14, currentHealthPoints: 12 }),
    );
  });

  it('applyEquipmentEffectTo no hace cambios si el id no existe', () => {
    const zone = new DigimonZone([
      createZoneCard({ uniqueIdInGame: 'a', currentAttackPoints: 10, currentHealthPoints: 10 }),
    ]);

    zone.applyEquipmentEffectTo('missing', { attackPoints: 4, healthPoints: 2 });

    expect(zone.getCardById('a')).toEqual(
      createZoneCard({ uniqueIdInGame: 'a', currentAttackPoints: 10, currentHealthPoints: 10 }),
    );
  });
});
