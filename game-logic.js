const { createNewGame } = require("./events/1_createNewGame")
const { playerJoinsGame } = require("./events/2_playerJoinsGame")
const { finishLoadPhase } = require("./events/5_finishLoadPhase")
const { finishSummonPhase } = require("./events/6_finishSummonPhase")
const {finishUpgradePhase} = require("./events/finishUpgradePhase")
const { activateEnergyCard } = require("./events/activateEnergyCard")
const { obtenerRooms } = require("./events/obtenerRooms")
const { onDisconnect } = require("./events/onDisconnect")
const PLAYER_ACTIONS = require("./models/PlayerActions")
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

    // User creates new game room after clicking 'submit' on the frontend
    gameSocket.on(SUBSCRIPTIONS_EVENTS.CREATE_NEW_GAME, (params) => createNewGame(params, gamesData, gamesIdsUsing, roomsWithOnePlayer, gameSocket))

    // User joins gameRoom after going to a URL with '/game/:gameId' 
    gameSocket.on(SUBSCRIPTIONS_EVENTS.PLAYER_JOIN_GAME, (params) => playerJoinsGame(params, io, gamesData, gameSocket))

    gameSocket.on(SUBSCRIPTIONS_EVENTS.GET_ROOMS, () => obtenerRooms(roomsWithOnePlayer, gameSocket))

    //gameSocket.on('start-phase', startPhase)
    //gameSocket.on(SUBSCRIPTIONS_EVENTS.CALUMON_SELECTED, (gameId, idCartaSelected) => calumonSelected(gameId, idCartaSelected))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_COMPILATION_PHASE, (params) => finishLoadPhase(params, gamesData, io))
    gameSocket.on(PLAYER_ACTIONS.SUMMON_DIGIMONS, (params) => finishSummonPhase(params, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_UPGRADE_PHASE, (params) => finishUpgradePhase(params, gamesData, io))

    gameSocket.on(SUBSCRIPTIONS_EVENTS.ACTIVATE_ENERGY_CARD, (params) => activateEnergyCard(params, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.ACTIVATE_EQUIPMENT_CARD, (params) => activateEquipmentCard(params, gamesData, io))
}

module.exports = {
    initializeGame,
}