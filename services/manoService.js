const CODIGO_TIPO_CARTA = require('../utils/enums').CODIGO_TIPO_CARTA

const obtenerEnergias = (mano) => {
    return {
        incoloro: contarEnergias(mano, CODIGO_TIPO_CARTA.INCOLORO),
        fuego: contarEnergias(mano, CODIGO_TIPO_CARTA.FUEGO),
        tierra: contarEnergias(mano, CODIGO_TIPO_CARTA.TIERRA),
        rayo: contarEnergias(mano, CODIGO_TIPO_CARTA.RAYO),
        dragon: contarEnergias(mano, CODIGO_TIPO_CARTA.DRAGON),
        hierba: contarEnergias(mano, CODIGO_TIPO_CARTA.HIERBA),
        agua: contarEnergias(mano, CODIGO_TIPO_CARTA.AGUA),
        fairy: contarEnergias(mano, CODIGO_TIPO_CARTA.FAIRY),
        oscuro: contarEnergias(mano, CODIGO_TIPO_CARTA.OSCURO),
        lucha: contarEnergias(mano, CODIGO_TIPO_CARTA.LUCHA),
        psiquico: contarEnergias(mano, CODIGO_TIPO_CARTA.PSIQUICO),
        metal: contarEnergias(mano, CODIGO_TIPO_CARTA.METAL),
    }
}

const obtenerEnergiasYSumarlas = (mano, energias) => {
    return {
        incoloro: contarEnergias(mano, CODIGO_TIPO_CARTA.INCOLORO) + energias.incoloro,
        fuego: contarEnergias(mano, CODIGO_TIPO_CARTA.FUEGO) + energias.incoloro,
        tierra: contarEnergias(mano, CODIGO_TIPO_CARTA.TIERRA) + energias.incoloro,
        rayo: contarEnergias(mano, CODIGO_TIPO_CARTA.RAYO) + energias.incoloro,
        dragon: contarEnergias(mano, CODIGO_TIPO_CARTA.DRAGON) + energias.incoloro,
        hierba: contarEnergias(mano, CODIGO_TIPO_CARTA.HIERBA),
        agua: contarEnergias(mano, CODIGO_TIPO_CARTA.AGUA),
        fairy: contarEnergias(mano, CODIGO_TIPO_CARTA.FAIRY),
        oscuro: contarEnergias(mano, CODIGO_TIPO_CARTA.OSCURO),
        lucha: contarEnergias(mano, CODIGO_TIPO_CARTA.LUCHA),
        psiquico: contarEnergias(mano, CODIGO_TIPO_CARTA.PSIQUICO),
        metal: contarEnergias(mano, CODIGO_TIPO_CARTA.METAL),
    }
}

const contarEnergias = (mano, tipoCarta) => {
    if (mano.length === 0)
        return 0

    return filtroPorCartasPokemon(mano, tipoCarta).length + filtroPorCartasEnergia(mano, tipoCarta).length
}

const filtroPorCartasPokemon = (mano, tipoCarta) => {
    return mano.getCartas().filter(carta => carta.tipo_energia != undefined && carta.tipo_energia === tipoCarta)
}

const filtroPorCartasEnergia = (mano, tipoCarta) => {
    return mano.getCartas().filter(carta => carta.energias != undefined && carta.energias.filter(energia => energia.nombre === tipoCarta).length > 0)
}

const esValidaLaInvocacion = (energias, cartasSeleccionadas) => {
    const energiasResultantes = quitarEnergiasPorCarta(energias, cartasSeleccionadas)
    const esValidaLaInvocacion = Object.values(energiasResultantes).every(x => x >= 0);
    return esValidaLaInvocacion
}

const quitarEnergiasPorCarta = (energias, cartasSeleccionadas) => {
    var energiasResultantes = energias
    cartasSeleccionadas.forEach(cartaPokemon => {
        const energiasAExtraer = cartaPokemon.cantidad_energia
        switch (cartaPokemon.tipo_energia) {
            case CODIGO_TIPO_CARTA.AGUA:
                energiasResultantes.agua -= energiasAExtraer
                break;
            case CODIGO_TIPO_CARTA.DRAGON:
                energiasResultantes.dragon -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.FAIRY:
                energiasResultantes.fairy -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.FUEGO:
                energiasResultantes.fuego -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.HIERBA:
                energiasResultantes.hierba -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.INCOLORO:
                energiasResultantes.incoloro -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.LUCHA:
                energiasResultantes.lucha -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.METAL:
                energiasResultantes.metal -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.OSCURO:
                energiasResultantes.oscuro -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.PSIQUICO:
                energiasResultantes.psiquico -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.RAYO:
                energiasResultantes.rayo -= energiasAExtraer
            break;
            case CODIGO_TIPO_CARTA.TIERRA:
                energiasResultantes.tierra -= energiasAExtraer
            break;
            default:
                throw "Error con el tipo de energía";
        }
    });
    return energiasResultantes
}


module.exports = {
    obtenerEnergias: obtenerEnergias,
    contarEnergias: contarEnergias,
    esValidaLaInvocacion: esValidaLaInvocacion,
    obtenerEnergiasYSumarlas: obtenerEnergiasYSumarlas
}