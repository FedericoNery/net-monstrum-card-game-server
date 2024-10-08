const EMIT_EVENTS = {
    START_GAME: 'START_GAME',
    NEW_GAME_CREATED: 'new game created',
    START_DRAW_PHASE: 'start draw phase',
    START_LOAD_PHASE: 'start load phase',
    START_SUMMON_PHASE: 'start summon phase',
    START_COMPILE_PHASE: 'start compile phase',
    START_BATTLE_PHASE: 'start battle phase',
    FINISH_BATTLE_PHASE: 'finish battle phase',
    SELECCIONAR_CALUMON: 'seleccionar-calumon',
    ESPERAR_SELECCION: 'esperar-seleccion',
    PLAYER_JOINED_ROOM: 'playerJoinedRoom',
    SEND_ROOMS: "send rooms",
    NEXT_ROUND: "next round",
    FINISHED_GAME: "finished game"
}

const SUBSCRIPTIONS_EVENTS = {
    DISCONNECT: "disconnect",
    CREATE_NEW_GAME: "createNewGame",
    PLAYER_JOIN_GAME: "playerJoinGame",
    GET_ROOMS: 'obtener rooms',

    CALUMON_SELECTED: 'calumon-selected',
    FINISH_DRAW_PHASE: 'finish draw phase',
    FINISH_COMPILATION_PHASE: 'FINISH_COMPILATION_PHASE',
    FINISH_SUMMON_PHASE: 'finish summon phase',
    FINISH_UPGRADE_PHASE: 'FINISH_UPGRADE_PHASE',

    ACTIVATE_ENERGY_CARD: 'activateEnergyCard',
    ACTIVATE_EQUIPMENT_CARD: 'activateEquipmentCard'
}

export {
    EMIT_EVENTS,
    SUBSCRIPTIONS_EVENTS
}