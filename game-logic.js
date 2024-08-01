const { calumonSelected } = require("./events/1_calumonSelected")
const { createNewGame } = require("./events/1_createNewGame")
const { playerJoinsGame } = require("./events/2_playerJoinsGame")
const { finishLoadPhase } = require("./events/5_finishLoadPhase")
const { finishCompilePhase } = require("./events/6_finishCompilePhase")
const { finishDrawPhase } = require("./events/6_finishDrawPhase")
const { finishSummonPhase } = require("./events/6_finishSummonPhase")
const { newMove } = require("./events/newMove")
const { obtenerRooms } = require("./events/obtenerRooms")
const { onDisconnect } = require("./events/onDisconnect")
const { SUBSCRIPTIONS_EVENTS } = require("./utils/events")

// gamesInSession stores an array of all active socket connections
var gamesInSession = []
var roomsWithOnePlayer = []

var gamesIdsUsing = []
var gamesData = []

// initializeGame sets up all the socket event listeners. 
const initializeGame = (sio, socket) => {

    var io = sio
    var gameSocket = socket

    // pushes this socket to an array which stores all the active sockets.
    gamesInSession.push(gameSocket)

    // Run code when the client disconnects from their socket session. 
    gameSocket.on(SUBSCRIPTIONS_EVENTS.DISCONNECT, () => onDisconnect(gamesInSession, gameSocket))

    // Sends new move to the other socket session in the same room. 
    gameSocket.on("new move", newMove)

    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on(SUBSCRIPTIONS_EVENTS.CREATE_NEW_GAME, (params) => createNewGame(params, gamesData, gamesIdsUsing, roomsWithOnePlayer, gameSocket))

    // User joins gameRoom after going to a URL with '/game/:gameId' 
    gameSocket.on(SUBSCRIPTIONS_EVENTS.PLAYER_JOIN_GAME, (params) => playerJoinsGame(params, io, gamesData, gameSocket))

    /*     gameSocket.on('request username', requestUserName)
        gameSocket.on('recieved userName', recievedUserName)
        */
    gameSocket.on(SUBSCRIPTIONS_EVENTS.GET_ROOMS, () => obtenerRooms(roomsWithOnePlayer, gameSocket))
    gameSocket.on("ping", client => {
        gameSocket.emit('pong');
    })

    //gameSocket.on('start-phase', startPhase)
    gameSocket.on(SUBSCRIPTIONS_EVENTS.CALUMON_SELECTED, (gameId, idCartaSelected) => calumonSelected(gameId, idCartaSelected))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_DRAW_PHASE, (gameId, usuarioId) => finishDrawPhase(gameId, usuarioId, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_LOAD_PHASE, (gameId, usuarioId, cartasId) => finishLoadPhase(gameId, usuarioId, cartasId, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_SUMMON_PHASE, (params) => finishSummonPhase(params, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_COMPILE_PHASE, (gameId, usuarioId, cartasId) => finishCompilePhase(gameId, usuarioId, cartasId, gamesData, io))
}

module.exports = {
    initializeGame,
}