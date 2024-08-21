const TYPE ={
    PROGRAMMING : 'Programming',
    DIGIMON : 'Digimon',
    ENERGY: 'Energy',
    EQUIPMENT: 'Equipment'
}

const COLOR ={
    RED: 'Red',
    BLUE: 'Blue',
    BROWN: 'Brown',
    BLACK: 'Black',
    GREEN: 'Green',
    WHITE: 'White',
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

const Enum = {
    TYPE,
    COLOR,
    RESULTADOS,
    FASES_JUEGO,
}

module.exports = Enum
