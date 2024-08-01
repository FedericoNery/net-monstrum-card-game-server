const CODIGO_CARTAS ={
    ENERGIA : 'E',
    POKEMON : 'P',
    ENTRENADOR: 'ENT',
    ARENA: 'A'
}

const CODIGO_TIPO_CARTA ={
    INCOLORO: 'Incoloro',
    FUEGO: 'Fuego',
    TIERRA: 'Tierra',
    RAYO: 'Rayo',
    DRAGON: 'Dragon',
    HIERBA : 'Hierba',
    AGUA : 'Agua',
    FAIRY : 'Celestial',
    OSCURO: 'Oscuro',
    LUCHA: 'Lucha',
    PSIQUICO: 'Psiquico',
    METAL: 'Metal',
}

const RESULTADOS ={
    GANADOR : 'Ganador',
    PERDEDOR : 'Perdedor',
    EMPATE: 'Empate',
}

const FASES_JUEGO = {
    INICIAR_JUEGO : 0,
    INICIAR_RONDA : 1,
    DETERMINACION_TURNO : 2,
    REPARTIR_CARTAS : 3,
    PROGRAMACION_1 : 4,
    INVOCACION: 5,
    PROGRAMACION_2 : 6,
    BATALLA : 7,
    DETERMINAR_GANADOR_RONDA : 8,
    DETERMINAR_GANADOR_PARTIDA : 9,
}

const NIVEL_EVOLUCION={
    BASICO: 1,
    ETAPA_1: 2,
    ETAPA_2: 3,
    INICIAL: 1,
    DEFINITIVO: 2,
    MEGA: 3,
}

const Enum = {
    CODIGO_CARTAS,
    CODIGO_TIPO_CARTA,
    RESULTADOS,
    FASES_JUEGO,
    NIVEL_EVOLUCION
}

module.exports = Enum
