import { EMIT_EVENTS } from "../utils/events.js"

function obtenerRooms(roomsConUnSoloJugador, gameSocket) {
    gameSocket.emit(EMIT_EVENTS.SEND_ROOMS, JSON.stringify({ roomsConUnSoloJugador }))
}

export { obtenerRooms }