import GameData from "../models/GameData.js"
import { getNewGameId } from "../services/getNewGameId.js"
import { EMIT_EVENTS } from "../utils/events.js"

function createNewGame({ deck, user }, gamesData, gamesIdsUsing, roomsConUnSoloJugador, gameSocket) {
    // Return the Room ID (gameId) and the socket ID (mySocketId) to the browser client
    try {
        let gameId = getNewGameId(gamesIdsUsing)
        roomsConUnSoloJugador.push(gameId)
        // Join the Room and wait for the other player
        gameSocket.join(gameId)

        // Guardar información del usuario y el mazo a utilizar que hizo join de la sesión
        var gameData = new GameData()
        gameData.setGameId(gameId)
        gameData.setSocketId(gameSocket.id)
        gameData.setSocketIdUsuarioA(gameSocket.id)
        console.log("CREATED GAME gameSocket.id", gameSocket.id)

        gameData.setUsuarioA(user)
        gameData.setDeckA(deck)
        gamesData.push(gameData)

        gameSocket.emit(EMIT_EVENTS.NEW_GAME_CREATED, JSON.stringify({ gameId: gameId, mySocketId: gameSocket.id }));
    }
    catch (ex) {
        console.log(ex)
    }
}

export { createNewGame }