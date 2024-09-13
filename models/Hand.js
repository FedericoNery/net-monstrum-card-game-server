import { TYPE } from "../utils/enums.js"

class Mano {
    constructor(mano) {
      this.cartas = mano;
    }
    
    setCartas(cartas){
      this.cartas = cartas
    }
    
    quitarCartas(listaIdsCartasAQuitar){
      const cartasADescartar = this.cartas.filter(card => !listaIdsCartasAQuitar.includes(card.uniqueIdInGame))
      this.setCartas(cartasADescartar)
    }
    
    getCartas(){
      return this.cartas
    }
    
    getLength(){
      return this.cartas.length
    }
    
    clear(){
      this.cartas = []
    }

    getCartasAInvocarFrom(listaIdsCartasAInvocar){
      return this.cartas.filter(card => card.type === TYPE.DIGIMON && listaIdsCartasAInvocar.includes(card.uniqueIdInGame))
    }

    getCartasOrdenadasPorAtaque(){
      return this.cartas.filter(card => card.type === TYPE.DIGIMON ).sort((a, b) => (a.attackPoints > b.attackPoints) ? 1 : -1)
    }

    getCardById(cardId){
      const card = this.cartas.filter(x => x.uniqueIdInGame === cardId)[0]
      return card
    }
}


export default Mano