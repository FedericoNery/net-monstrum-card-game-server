const { EMIT_EVENTS } = require("../utils/events")

function calumonSelected(gameId, idCartaSelected) {
    io.sockets.in(gameId).emit(EMIT_EVENTS.START_DRAW_PHASE)
}

module.exports = { calumonSelected }