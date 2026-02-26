import {COLOR} from '../utils/enums.js'

const obtenerEnergias = (mano) => {
    return {
        red: contarEnergias(mano, COLOR.RED), 
        blue: contarEnergias(mano, COLOR.BLUE),
        brown: contarEnergias(mano, COLOR.BROWN),
        black: contarEnergias(mano, COLOR.BLACK),
        green: contarEnergias(mano, COLOR.GREEN),
        white: contarEnergias(mano, COLOR.WHITE),
    }
}

const obtenerEnergiasYSumarlas = (mano, energias) => {
    return {
        red: contarEnergias(mano, COLOR.RED) + energias.red, 
        blue: contarEnergias(mano, COLOR.BLUE)+ energias.blue, 
        brown: contarEnergias(mano, COLOR.BROWN)+ energias.brown, 
        black: contarEnergias(mano, COLOR.BLACK)+ energias.black, 
        green: contarEnergias(mano, COLOR.GREEN)+ energias.green, 
        white: contarEnergias(mano, COLOR.WHITE)+ energias.white, 
    }
}

const contarEnergias = (mano, color) => {
    if (mano.cartas.length > 0)
        return filtroPorCartasQueTienenColor(mano, color).length
    return 0
}

const filtroPorCartasQueTienenColor = (mano, color) => {
    return mano.cartas.filter(carta => carta.color && carta.color === color)
}

const esValidaLaInvocacion = (energias, cartasSeleccionadas) => {
    const energiasResultantes = quitarEnergiasPorCarta(energias, cartasSeleccionadas)
    const esValidaLaInvocacion = Object.values(energiasResultantes).every(x => x >= 0);
    return esValidaLaInvocacion
}

const quitarEnergiasPorCarta = (energias, cartasSeleccionadas) => {
    var energiasResultantes = energias
    cartasSeleccionadas.forEach(digimonCard => {
        const energiasAExtraer = digimonCard.energyCount
        switch (digimonCard.color) {
            case COLOR.RED:
                energiasResultantes.red -= energiasAExtraer
                break;
            case COLOR.BLUE:
                energiasResultantes.blue -= energiasAExtraer
            break;
            case COLOR.BLACK:
                energiasResultantes.black -= energiasAExtraer
            break;
            case COLOR.BROWN:
                energiasResultantes.brown -= energiasAExtraer
            break;
            case COLOR.GREEN:
                energiasResultantes.green -= energiasAExtraer
            break;
            case COLOR.WHITE:
                energiasResultantes.white -= energiasAExtraer
            break;
            default:
                throw "Error con el tipo de energía";
        }
    });
    return energiasResultantes
}


export {
    obtenerEnergias,
    contarEnergias,
    esValidaLaInvocacion,
    obtenerEnergiasYSumarlas
}