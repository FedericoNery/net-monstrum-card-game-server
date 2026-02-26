import Field from "./field/Field.js"
import EstadosDeLaPartida  from './EstadosPartida.js'
import {EquipmentCard} from './EquipmentEffect.js'

interface Player {
    numero: number;
    username: string;
}

type GameState = typeof EstadosDeLaPartida[keyof typeof EstadosDeLaPartida];

class Game {
    esTurnoDeJugador1: boolean;
    esTurnoDeJugador2: boolean;
    player1: Player | null;
    player2: Player | null;
    field1: Field;
    field2: Field;
    roundsPlayer1: number;
    roundsPlayer2: number;
    numeroJugadorGanador: number | null;
    numeroJugadorPerdedor: number | null;
    player1FinishedLoadPhase: boolean;
    player2FinishedLoadPhase: boolean;
    player1FinishedUpgradePhase: boolean;
    player2FinishedUpgradePhase: boolean;
    player1SummonCards: boolean;
    player2SummonCards: boolean;
    estadoDeLaRonda: GameState;

    constructor() {
        this.esTurnoDeJugador1 = true
        this.esTurnoDeJugador2 = false
        this.player1 = null;
        this.player2 = null;
        this.field1 = new Field()
        this.field2 = new Field()
        this.roundsPlayer1 = 0
        this.roundsPlayer2 = 0
        this.numeroJugadorGanador = null
        this.numeroJugadorPerdedor = null
        this.player1FinishedLoadPhase = false
        this.player2FinishedLoadPhase = false
        this.player1FinishedUpgradePhase = false
        this.player2FinishedUpgradePhase = false
        this.player1SummonCards = false
        this.player2SummonCards = false
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_CREATED
    }

    resetCheckOfActionsByPlayers(): void {
        this.player1FinishedLoadPhase = false
        this.player2FinishedLoadPhase = false
        this.player1FinishedUpgradePhase = false
        this.player2FinishedUpgradePhase = false
        this.player1SummonCards = false
        this.player2SummonCards = false
    }

    resetStateOfFields(): void {
        this.field1.resetState()
        this.field2.resetState()
    }

    initGame(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_STARTED
        this.shuffleDecks()
    }

    shuffleDecks(): void {
        this.field1.deck.shuffle()
        this.field2.deck.shuffle()
    }

    iniciarRonda(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.ROUND_STARTED
    }

    setJugador1(jugador1: Player): void {
        this.player1 = jugador1
    }

    setJugador2(jugador2: Player): void {
        this.player2 = jugador2
    }

    setMazo1(mazo1: any): void {
        this.field1.setMazo(mazo1)
    }

    setMazo2(mazo2: any): void {
        this.field2.setMazo(mazo2)
    }

    repartirCartas(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.DRAW_PHASE
        this.field1.repartirCartas(6)
        this.field2.repartirCartas(6)
        this.contarEnergias()
    }

    contarEnergias(): void {
        this.field1.contarEnergias()
        this.field2.contarEnergias()
    }

    getCampoByIdJugador(idJugador: number): Field {
        if (idJugador == this.player1?.numero) {
            return this.field1
        }
        else {
            return this.field2
        }
    }

    invocarCartasPokemon(cartasAInvocar: any[], idJugador: number): void {
        if (idJugador == this.player1?.numero) {
            this.field1.invocarCartas(cartasAInvocar)
            this.field2.invocarCartasComputadora()
        }
    }

    iniciarBatalla(): void {
        this.determinarGanadorDeLaRonda()
        this.determinarGanadorPartida()
        if(!this.estaFinalizado()){
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_ROUND
            this.pasarASiguienteRonda()    
        }
    }

    player1AttacksPlayer2(): void {
        const attackPlayer1 = this.field1.getAtaque()
        const healthPlayer2 = this.field2.getDefensa()
        
        this.field1.attackPoints = 0
        this.field2.healthPoints = healthPlayer2 - attackPlayer1 > 0 ? healthPlayer2 - attackPlayer1 : 0
    }

    player2AttacksPlayer1(): void {
        const attackPlayer2 = this.field2.getAtaque()
        const healthPlayer1 = this.field1.getDefensa()
        
        this.field2.attackPoints = 0
        this.field1.healthPoints = healthPlayer1 - attackPlayer2 > 0 ? healthPlayer1 - attackPlayer2 : 0
    }

    resolveWinner(): void {
        if (this.field2.healthPoints > this.field1.healthPoints) {
            this.roundsPlayer2 += 1
        }
        else {
            this.roundsPlayer1 += 1
        }
    }

    resolveIfGameIsFinished(): void {
        this.estadoDeLaRonda = this.roundsPlayer1 === 2 || this.roundsPlayer2 === 2 ? EstadosDeLaPartida.FINISHED_GAME : EstadosDeLaPartida.FINISHED_ROUND
    }

    determinarGanadorDeLaRonda(): void {
        const ataqueJugador = this.field1.getAtaque()
        const ataqueComputadora = this.field2.getAtaque()
        const defensaJugador = this.field1.getDefensa()
        const defensaComputadora = this.field2.getDefensa()
        const deltaJugador = defensaJugador - ataqueComputadora
        const deltaComputadora = defensaComputadora - ataqueJugador

        const ambosJugadoresQuedaronSinDefensa = deltaJugador <= 0 && deltaComputadora <= 0
        const computadoraPudoDefenderseYJugadorQuedoSinDefensa = deltaComputadora > 0 && deltaJugador <= 0
        const jugadorPudoDefenderseYComputadoraQuedoSinDefensa = deltaJugador > 0 && deltaComputadora <= 0
        const ventajaDeComputadora = deltaJugador > 0 && deltaComputadora > 0 && deltaComputadora > deltaJugador
        const ventajaDeJugador = deltaJugador > 0 && deltaComputadora > 0 && deltaJugador > deltaComputadora

        if (ambosJugadoresQuedaronSinDefensa || computadoraPudoDefenderseYJugadorQuedoSinDefensa || ventajaDeComputadora) {
            this.roundsPlayer2 += 1
        }
        else if (jugadorPudoDefenderseYComputadoraQuedoSinDefensa || ventajaDeJugador) {
            this.roundsPlayer1 += 1
        }
    }

    determinarGanadorPartida(): void {
        if (this.roundsPlayer1 === 2) {
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_GAME
            this.numeroJugadorGanador = this.player1?.numero ?? null
            this.numeroJugadorPerdedor = this.player2?.numero ?? null
        }
        else if (this.roundsPlayer2 === 2) {
            this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_GAME
            this.numeroJugadorGanador = this.player2?.numero ?? null
            this.numeroJugadorPerdedor = this.player1?.numero ?? null
        }
    }

    pasarASiguienteRonda(): void {
        if(this.estadoDeLaRonda !== EstadosDeLaPartida.FINISHED_GAME){
            this.field1.descartarCartasMano()
            this.field1.descartarCartasCampo()
            this.field2.descartarCartasMano()
            this.field2.descartarCartasCampo()
            this.player1SummonCards = false
            this.player2SummonCards = false
        }
    }

    finalizarRonda(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.FINISHED_ROUND
    }

    estaFinalizado(): boolean {
        return this.estadoDeLaRonda === EstadosDeLaPartida.FINISHED_GAME
    }

    ganoJugador1(): boolean {
        return this.roundsPlayer1 == 2
    }

    ganoJugador2(): boolean {
        return this.roundsPlayer2 == 2
    }

    startPhase(): void {
        this.initGame()
        this.iniciarRonda()
    }

    startDrawPhase(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.GAME_STARTED
        this.shuffleDecks()
        this.estadoDeLaRonda = EstadosDeLaPartida.ROUND_STARTED
        this.repartirCartas()
    }

    startCompilePhase(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.COMPILATION_PHASE
    }

    drawPhase(): void {
        this.repartirCartas()
    }

    finishSummonPhase(usuario: any, cartasId: any[], socketId: string, socketIdUsuarioA: string, socketIdUsuarioB: string): void {
        const { username: nombreUsuarioJugador1 } = this.player1 ?? { username: '' }
        const { username: nombreUsuarioJugador2 } = this.player2 ?? { username: '' }
        if ( socketId === socketIdUsuarioA){
            this.field1.invocarCartas(cartasId)
            this.player1SummonCards = true
        } 
        if (socketId === socketIdUsuarioB ) {
            this.field2.invocarCartas(cartasId)
            this.player2SummonCards = true
        }
    }

    finishedSummonPhase(): boolean {
        return this.player1SummonCards && this.player2SummonCards
    }

    finishCompilePhase(): void {
        console.log(this.estadoDeLaRonda)
        this.estadoDeLaRonda = EstadosDeLaPartida.BATTLE_PHASE
    }

    startBattlePhaseJugador1(): void {
        this.field1.atacar(this.field2)
    }

    startBattlePhaseJugador2(): void {
        this.field2.atacar(this.field1)
    }

    finishBattlePhaseJugador1(): void {

    }

    finishBattlePhaseJugador2(): void {
        
    }

    finishLoadPhaseBy(usuarioId: any, socketId: string, socketIdUsuarioA: string, socketIdUsuarioB: string): void {
        if (socketId === socketIdUsuarioA){
            this.player1FinishedLoadPhase = true
        }
        if(socketId === socketIdUsuarioB){
            this.player2FinishedLoadPhase = true
        }
    }
    
    finishedLoadPhase(): boolean {
        return this.player1FinishedLoadPhase && this.player2FinishedLoadPhase
    }

    startSummonPhase(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.SUMMON_PHASE
    }

    activateEnergyCardJugador1(cardId: string): void {
        const energyCard = this.field1.hand.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
        const color = energyCard.color
        const energyCount = energyCard.energyCount
        if(energyCount < 0){
            this.field2.quitarEnergiasPor(energyCard);
        }
        else{
            this.field1.agregarEnergiaPor(energyCard);
        }
        this.field1.hand.cartas = this.field1.hand.cartas.filter(x => x.uniqueIdInGame !== cardId)
        this.field1.trash.agregarCarta(energyCard);
    }

    activateEnergyCardJugador2(cardId: string): void {
        const energyCard = this.field2.hand.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
        const color = energyCard.color
        const energyCount = energyCard.energyCount

        if(energyCount < 0){
            this.field1.quitarEnergiasPor(energyCard);
        }
        else{
            this.field2.agregarEnergiaPor(energyCard);
        }
        this.field2.hand.cartas = this.field2.hand.cartas.filter(x => x.uniqueIdInGame !== cardId)
        this.field2.trash.agregarCarta(energyCard)
    }

    activateEquipmentCardJugador1(cardDigimonId: string, cardEquipmentId: string): void {
        const {name, attackPoints, healthPoints, quantityOfTargets, targetScope} = this.field1.hand.getCardById(cardEquipmentId)
        const cardEquipment = new EquipmentCard(name, attackPoints, healthPoints, quantityOfTargets, targetScope)
        
        const cardDigimon = this.field1.digimonZone.getCardById(cardDigimonId)
        cardEquipment.applyTo([cardDigimon.uniqueIdInGame], this.field1.digimonZone)
        
        this.field1.discardFromHand(cardEquipmentId);

        this.field1.attackPoints = this.field1.getAtaque()
        this.field1.healthPoints = this.field1.getDefensa()
        console.log(this.field1.attackPoints)
        console.log(this.field1.healthPoints)
    }

    activateEquipmentCardJugador2(cardDigimonId: string, cardEquipmentId: string): void {
        const {name, attackPoints, healthPoints, quantityOfTargets, targetScope} = this.field2.hand.getCardById(cardEquipmentId)
        const cardEquipment = new EquipmentCard(name, attackPoints, healthPoints, quantityOfTargets, targetScope)
        
        const cardDigimon = this.field2.digimonZone.getCardById(cardDigimonId)
        cardEquipment.applyTo([cardDigimon.uniqueIdInGame], this.field2.digimonZone)

        this.field2.discardFromHand(cardEquipmentId);

        this.field2.attackPoints = this.field2.getAtaque()
        this.field2.healthPoints = this.field2.getDefensa()
        console.log(this.field2.attackPoints)
        console.log(this.field2.healthPoints)
    }

    finishedRonda(): boolean {
        return this.estadoDeLaRonda === EstadosDeLaPartida.FINISHED_ROUND
    }

    finishUpgradePhase(usuarioId: any, cardDigimonsToSummonIds: any[], socketId: string, socketIdUsuarioA: string, socketIdUsuarioB: string): void {
        if (socketId === socketIdUsuarioA){
            this.player1FinishedUpgradePhase = true
        }
        if(socketId === socketIdUsuarioB){
            this.player2FinishedUpgradePhase = true
        }

        if(this.player1FinishedUpgradePhase && this.player2FinishedUpgradePhase){
            this.estadoDeLaRonda = EstadosDeLaPartida.BATTLE_PHASE
        }
    }

    isFinishedUpgradePhase(): boolean {
        return this.player1FinishedUpgradePhase && this.player2FinishedUpgradePhase
    }

    toUpgradePhase(): void {
        this.estadoDeLaRonda = EstadosDeLaPartida.UPGRADE_PHASE
    }
}

export default Game