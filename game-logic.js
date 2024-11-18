import { createNewGame } from './events/1_createNewGame.js';
import { playerJoinsGame } from './events/2_playerJoinsGame.js';
import { finishLoadPhase } from './events/5_finishLoadPhase.js';
import { finishSummonPhase } from './events/6_finishSummonPhase.js';
import { finishUpgradePhase } from './events/finishUpgradePhase.js';
import { activateEnergyCard } from './events/activateEnergyCard.js';
import { obtenerRooms } from './events/obtenerRooms.js';
import { onDisconnect } from './events/onDisconnect.js';
import PLAYER_ACTIONS from './models/PlayerActions.js';
import { SUBSCRIPTIONS_EVENTS } from './utils/events.js';
import {activateEquipmentCard } from "./events/activateEquipmentCard.js";

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
    gameSocket.on(SUBSCRIPTIONS_EVENTS.PLAYER_JOIN_GAME, (params) => playerJoinsGame(params, io, gamesData, gameSocket, roomsWithOnePlayer))

    gameSocket.on(SUBSCRIPTIONS_EVENTS.GET_ROOMS, () => obtenerRooms(roomsWithOnePlayer, gameSocket))

    //gameSocket.on('start-phase', startPhase)
    //gameSocket.on(SUBSCRIPTIONS_EVENTS.CALUMON_SELECTED, (gameId, idCartaSelected) => calumonSelected(gameId, idCartaSelected))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_COMPILATION_PHASE, (params) => finishLoadPhase(params, gamesData, io))
    gameSocket.on(PLAYER_ACTIONS.SUMMON_DIGIMONS, (params) => finishSummonPhase(params, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.FINISH_UPGRADE_PHASE, (params) => finishUpgradePhase(params, gamesData, io))

    gameSocket.on(SUBSCRIPTIONS_EVENTS.ACTIVATE_ENERGY_CARD, (params) => activateEnergyCard(params, gamesData, io))
    gameSocket.on(SUBSCRIPTIONS_EVENTS.ACTIVATE_EQUIPMENT_CARD, (params) => activateEquipmentCard(params, gamesData, io))
}

export {
    initializeGame,
}