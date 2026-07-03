import Deck from '../../../models/field/Deck';

type TestCard = { uniqueIdInGame: string };

describe('Deck', () => {
  it('extractCard devuelve la primera carta y reduce el largo', () => {
    const cards: TestCard[] = [{ uniqueIdInGame: 'c1' }, { uniqueIdInGame: 'c2' }];
    const deck = new Deck(cards);

    const extracted = deck.extractCard();

    expect(extracted).toEqual({ uniqueIdInGame: 'c1' });
    expect(deck.getLength()).toBe(1);
  });

  it('extractCard devuelve undefined cuando el mazo esta vacio', () => {
    const deck = new Deck([]);

    const extracted = deck.extractCard();

    expect(extracted).toBeUndefined();
    expect(deck.getLength()).toBe(0);
  });

  it('extractCardsByQuantity extrae hasta la cantidad disponible', () => {
    const cards: TestCard[] = [{ uniqueIdInGame: 'c1' }, { uniqueIdInGame: 'c2' }];
    const deck = new Deck(cards);

    const extracted = deck.extractCardsByQuantity(5);

    expect(extracted).toEqual([{ uniqueIdInGame: 'c1' }, { uniqueIdInGame: 'c2' }]);
    expect(deck.getLength()).toBe(0);
  });

  it('shuffle conserva todas las cartas del mazo', () => {
    const cards: TestCard[] = [
      { uniqueIdInGame: 'c1' },
      { uniqueIdInGame: 'c2' },
      { uniqueIdInGame: 'c3' },
      { uniqueIdInGame: 'c4' },
    ];
    const deck = new Deck([...cards]);

    deck.shuffle();
    const extracted = deck.extractCardsByQuantity(10);

    expect(extracted).toHaveLength(4);
    expect(extracted.map(x => x.uniqueIdInGame).sort()).toEqual(cards.map(x => x.uniqueIdInGame).sort());
  });
});
