import Hand from '../../../models/field/Hand';
import { TYPE } from '../../../utils/enums.js';

type TestCard = {
  uniqueIdInGame: string;
  type: string;
  attackPoints: number;
};

const buildCard = (overrides: Partial<TestCard> = {}): TestCard => ({
  uniqueIdInGame: overrides.uniqueIdInGame ?? 'id',
  type: overrides.type ?? TYPE.DIGIMON,
  attackPoints: overrides.attackPoints ?? 0,
});

describe('Hand', () => {
  it('setCartas y getCartas actualizan el contenido de la mano', () => {
    const hand = new Hand([]);
    const cards = [buildCard({ uniqueIdInGame: 'a' })];

    hand.setCartas(cards);

    expect(hand.getCartas()).toEqual(cards);
    expect(hand.getLength()).toBe(1);
  });

  it('quitarCartas elimina solo las cartas indicadas por id', () => {
    const hand = new Hand([
      buildCard({ uniqueIdInGame: 'a' }),
      buildCard({ uniqueIdInGame: 'b' }),
      buildCard({ uniqueIdInGame: 'c' }),
    ]);

    hand.quitarCartas(['b']);

    expect(hand.getCartas().map(x => x.uniqueIdInGame)).toEqual(['a', 'c']);
  });

  it('clear vacia la mano', () => {
    const hand = new Hand([buildCard({ uniqueIdInGame: 'a' })]);

    hand.clear();

    expect(hand.getCartas()).toEqual([]);
    expect(hand.getLength()).toBe(0);
  });

  it('getCartasAInvocarFrom devuelve solo cartas DIGIMON dentro de los ids pedidos', () => {
    const hand = new Hand([
      buildCard({ uniqueIdInGame: 'a', type: TYPE.DIGIMON }),
      buildCard({ uniqueIdInGame: 'b', type: TYPE.ENERGY }),
      buildCard({ uniqueIdInGame: 'c', type: TYPE.DIGIMON }),
    ]);

    const cardsToSummon = hand.getCartasAInvocarFrom(['b', 'c']);

    expect(cardsToSummon.map(x => x.uniqueIdInGame)).toEqual(['c']);
  });

  it('getCartasOrdenadasPorAtaque retorna DIGIMON ordenados de menor a mayor ataque', () => {
    const hand = new Hand([
      buildCard({ uniqueIdInGame: 'a', attackPoints: 30, type: TYPE.DIGIMON }),
      buildCard({ uniqueIdInGame: 'b', attackPoints: 10, type: TYPE.DIGIMON }),
      buildCard({ uniqueIdInGame: 'c', attackPoints: 20, type: TYPE.ENERGY }),
      buildCard({ uniqueIdInGame: 'd', attackPoints: 20, type: TYPE.DIGIMON }),
    ]);

    const sorted = hand.getCartasOrdenadasPorAtaque();

    expect(sorted.map(x => x.uniqueIdInGame)).toEqual(['b', 'd', 'a']);
  });

  it('getCardById retorna la carta cuando existe', () => {
    const hand = new Hand([buildCard({ uniqueIdInGame: 'a' })]);

    expect(hand.getCardById('a')).toEqual(buildCard({ uniqueIdInGame: 'a' }));
    expect(hand.getCardById('missing')).toBeUndefined();
  });
});
