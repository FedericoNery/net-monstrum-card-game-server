const { EMIT_EVENTS } = require("../utils/events")

function finishDrawPhase(gameId, usuarioId, io) {
    io.sockets.in(gameId).emit(EMIT_EVENTS.START_LOAD_PHASE)
}

module.exports = { finishDrawPhase }