function startPhase(gameId, gamesData, io) {
    //enviar mensaje a ambos clientes, uno espera y el otro selecciona a Calumon
    //io.sockets.in(gameId)

    var gameDataToJoin = gamesData.filter(x => x.getGameId() === gameId)
    gameDataToJoin[0].juego.startPhase()

    //ABAJO ES EL EJEMPLO DE CADA CLIENTE EN PARTICULAR
    /* io.to(data.id).emit(EMIT_EVENTS.SELECCIONAR_CALUMON, move);
    io.to(data.id).emit(EMIT_EVENTS.ESPERAR_SELECCION, move); */

    //io.sockets.in(gameIdToJoin).emit('start game')

}

module.exports = { startPhase }