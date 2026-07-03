import Trash from '../../../models/field/Trash';

type TestCard = { uniqueIdInGame: string };

describe('Trash', () => {
  it('agregarCarta agrega una carta al trash', () => {
    const trash = new Trash([]);

    trash.agregarCarta({ uniqueIdInGame: 'c1' });

    expect((trash as any).cartas).toEqual([{ uniqueIdInGame: 'c1' }]);
  });

  it('agregarCartas agrega todas las cartas recibidas', () => {
    const trash = new Trash([{ uniqueIdInGame: 'c1' } as TestCard]);

    trash.agregarCartas([{ uniqueIdInGame: 'c2' }, { uniqueIdInGame: 'c3' }]);

    expect((trash as any).cartas).toEqual([
      { uniqueIdInGame: 'c1' },
      { uniqueIdInGame: 'c2' },
      { uniqueIdInGame: 'c3' },
    ]);
  });
});
