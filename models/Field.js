import Hand  from './Hand.js'
import Trash  from './Trash.js' 
import Deck  from './Deck.js'
import DigimonZone  from './DigimonZone.js'
import { obtenerEnergias, obtenerEnergiasYSumarlas } from '../services/manoService.js'
import {COLOR} from '../utils/enums.js'


class Field {
  constructor(deckCards = [], handCards = [], zonaJuego = [], trashCards = []) {
    this.attackPoints = 0;
    this.healthPoints = 0;
    this.hand = new Hand(handCards);
    this.digimonZone = new DigimonZone(zonaJuego);
    this.deck = new Deck(deckCards);
    this.trash = new Trash(trashCards);
    this.cantidadesEnergias = null
  }

  discardDigimonZoneAndHandCards(){
    const handCards = this.hand.getCartas();
    const digimonZoneCards = this.digimonZone.getCartas();

    this.hand.clear()
    this.digimonZone.clear()

    this.trash.agregarCartas(handCards) //TODO :: en realidad debería ir agregandose a medida que se usan
    this.trash.agregarCartas(digimonZoneCards)//TODO :: en realidad debería ir agregandose a medida que se usan

  }

  discardFromHand(cardId){
    const cardToTrash = this.hand.getCardById(cardId)
    this.trash.agregarCarta(cardToTrash)
    this.hand.cartas = this.hand.cartas.filter(x => x.uniqueIdInGame !== cardId)
  }

  resetState(){
    this.attackPoints = 0
    this.healthPoints = 0
    this.discardDigimonZoneAndHandCards()
  }

  setMazo(mazo){
    this.deck = mazo
  }

  repartirCartas(cantidad) {
    const cartasExtraidas = this.deck.extraerCartas(cantidad)
    this.hand.setCartas(cartasExtraidas)
  }

  contarEnergias() {
    if(this.cantidadesEnergias !== null){
      this.cantidadesEnergias = obtenerEnergiasYSumarlas(this.hand, this.cantidadesEnergias)
    }
    else{
      this.cantidadesEnergias = obtenerEnergias(this.hand)
    }
  }
  getCantidadEnergias() {
    return this.cantidadesEnergias
  }

  invocarCartas(listaIdsCartasAInvocar) {
    const cartasAInvocar = this.hand.getCartasAInvocarFrom(listaIdsCartasAInvocar)
    this.digimonZone.setCartas(cartasAInvocar)
    this.hand.quitarCartas(listaIdsCartasAInvocar)

    for (let index = 0; index < cartasAInvocar.length; index++) {
      const card = cartasAInvocar[index];
      this.quitarEnergiasGastadasPor(card)
    }

    this.attackPoints = this.getAtaque()
    this.healthPoints = this.getDefensa()
  }

  invocarCartasComputadora() {
    const mejoresCartasOrdenadas = this.hand.getCartasOrdenadasPorAtaque()
    if (mejoresCartasOrdenadas.length > 0) {
      mejoresCartasOrdenadas.map(x => this.invocarCartaComputadora(x))
    }
    //Quitar cartas invocadas de la mano de la computadora y setear bien la zona de juego
  }

  esValidaLaInvocacionDeLaCarta(carta, cantidadesEnergias){
    const energias = cantidadesEnergias[carta.tipo_energia] //Si o si el tolowercase porque sino no puede acceder a la clave del objeto
    return carta.cantidad_energia <= energias
  }

  esValidaLaInvocacionDeLaCartaEnComputadora(carta, cantidadesEnergias){
    const energias = cantidadesEnergias[carta.tipo_energia.toLowerCase()] //Si o si el tolowercase porque sino no puede acceder a la clave del objeto
    return carta.cantidad_energia <= energias
  }

  invocarCartaComputadora(carta) {
    if (this.esValidaLaInvocacionDeLaCartaEnComputadora(carta, this.cantidadesEnergias)) {
      this.digimonZone.invocarCarta(carta)
      this.quitarEnergiasGastadasPor(carta)
    }
  }

  invocarCarta(carta) {
    if (this.esValidaLaInvocacionDeLaCarta(carta, this.cantidadesEnergias)) {
      this.digimonZone.invocarCarta(carta)
      this.quitarEnergiasGastadasPor(carta)
    }
  }

  quitarEnergiasGastadasPor(card) {
    const color = card.color
    const energiasARestar = card.energyCount
    switch (color) {
      case COLOR.RED:
        this.cantidadesEnergias.red -= energiasARestar
        break;
      case COLOR.BLACK:
        this.cantidadesEnergias.black -= energiasARestar
        break;
      case COLOR.BLUE:
        this.cantidadesEnergias.blue -= energiasARestar
        break;
      case COLOR.BROWN:
        this.cantidadesEnergias.brown -= energiasARestar
        break;
      case COLOR.GREEN:
        this.cantidadesEnergias.green -= energiasARestar
        break;
      case COLOR.WHITE:
        this.cantidadesEnergias.white -= energiasARestar
        break;
      default:
        throw "Error con el tipo de energía";
    }
  }

  quitarEnergiasPor(card) {
    const color = card.color
    const energiasARestar = card.energyCount
    switch (color) {
      case COLOR.RED:
        if(this.cantidadesEnergias.red > 0){
          this.cantidadesEnergias.red -= energiasARestar
        }
        break;
      case COLOR.BLACK:
        if(this.cantidadesEnergias.black > 0){
          this.cantidadesEnergias.black -= energiasARestar
        }
        break;
      case COLOR.BLUE:
        if(this.cantidadesEnergias.blue > 0){
          this.cantidadesEnergias.blue -= energiasARestar
        }
        break;
      case COLOR.BROWN:
        if(this.cantidadesEnergias.brown > 0){
          this.cantidadesEnergias.brown -= energiasARestar
        }
        break;
      case COLOR.GREEN:
        if(this.cantidadesEnergias.green > 0){
          this.cantidadesEnergias.green -= energiasARestar
        }
        break;
      case COLOR.WHITE:
        if(this.cantidadesEnergias.white > 0){
          this.cantidadesEnergias.white -= energiasARestar
        }
        break;
      default:
        throw "Error con el tipo de energía";
    }
  }

  agregarEnergiaPor(card){
    const color = card.color
    const energiasASumar = card.energyCount

    switch (color) {
      case COLOR.RED:
        this.cantidadesEnergias.red += energiasASumar
        break;
      case COLOR.BLACK:
        this.cantidadesEnergias.black += energiasASumar
        break;
      case COLOR.BLUE:
        this.cantidadesEnergias.blue += energiasASumar
        break;
      case COLOR.BROWN:
        this.cantidadesEnergias.brown += energiasASumar
        break;
      case COLOR.GREEN:
        this.cantidadesEnergias.green += energiasASumar
        break;
      case COLOR.WHITE:
        this.cantidadesEnergias.white += energiasASumar
        break;
      default:
        throw "Error con el tipo de energía";
    }
  }

  descartarCartasMano(){
    if(this.hand.getLength() > 0){
      this.hand.getCartas().map((carta) => this.trash.agregarCarta(carta))
      this.hand.clear()
    }
  }

  descartarCartasCampo(){
    if(this.digimonZone.getLength() > 0){
      this.digimonZone.getCartas().map((carta) => this.trash.agregarCarta(carta))
      this.digimonZone.clear()
    }
  }

  getAtaque(){
    return this.digimonZone.getAtaque()
  }
  getDefensa(){
    return this.digimonZone.getDefensa()
  }

  getMano(){
    return this.hand
  }
  getMazo(){
    return this.deck
  }
  getZonaJuego(){
    return this.digimonZone
  }

  atacar(campoRival){
    const ataque = this.getAtaque()
    campoRival.defender(ataque)
  }

  defender(dañoRecibido){
    this.healthPoints -= dañoRecibido
  }
}

export default Field