import { 
    obtenerEnergias, 
    contarEnergias, 
    esValidaLaInvocacion, 
    obtenerEnergiasYSumarlas 
} from './manoService.js'
import { COLOR } from '../utils/enums.js'

describe('Tests para las funciones de manejo de energías', () => {
    test('contarEnergias debería contar correctamente las energías de un color específico en la mano', () => {
        const mano = {
            cartas: [{ color: COLOR.RED }, { color: COLOR.RED }, { color: COLOR.BLUE }]
        }
        expect(contarEnergias(mano, COLOR.RED)).toBe(2);
        expect(contarEnergias(mano, COLOR.BLUE)).toBe(1);
        expect(contarEnergias(mano, COLOR.BLACK)).toBe(0);
    });

    test('obtenerEnergias debería contar las energías de todos los colores en la mano', () => {
        const mano = {
            cartas: [{ color: COLOR.RED }, { color: COLOR.BLUE }, { color: COLOR.GREEN }]
        }
        const energias = obtenerEnergias(mano);
        expect(energias).toEqual({
            red: 1,
            blue: 1,
            brown: 0,
            black: 0,
            green: 1,
            white: 0,
        });
    });

    test('obtenerEnergiasYSumarlas debería sumar las energías actuales con las ya existentes', () => {
        const mano = { 
            cartas: [{ color: COLOR.RED }, { color: COLOR.BLUE }]
        }
        const energias = { red: 2, blue: 1, brown: 0, black: 0, green: 0, white: 0 };
        const energiasSumadas = obtenerEnergiasYSumarlas(mano, energias);
        expect(energiasSumadas).toEqual({
            red: 3,
            blue: 2,
            brown: 0,
            black: 0,
            green: 0,
            white: 0,
        });
    });

    test('esValidaLaInvocacion debería retornar true si las energías son suficientes para las cartas seleccionadas', () => {
        const energias = { red: 2, blue: 3, brown: 0, black: 0, green: 1, white: 0 };
        const cartasSeleccionadas = [{ color: COLOR.RED, energyCount: 1 }, { color: COLOR.BLUE, energyCount: 2 }];
        expect(esValidaLaInvocacion(energias, cartasSeleccionadas)).toBe(true);
    });

    test('esValidaLaInvocacion debería retornar false si las energías no son suficientes para las cartas seleccionadas', () => {
        const energias = { red: 2, blue: 1, brown: 0, black: 0, green: 1, white: 0 };
        const cartasSeleccionadas = [{ color: COLOR.RED, energyCount: 3 }];
        expect(esValidaLaInvocacion(energias, cartasSeleccionadas)).toBe(false);
    });
});
