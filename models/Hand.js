class Mano {
    constructor(mano) {
      this.cartas = mano;
    }
    
    setCartas(cartas){
      this.cartas = cartas
    }
    
    quitarCartas(listaIdsCartasAQuitar){
      const cartasADescartar = this.cartas.filter(x => !listaIdsCartasAQuitar.includes(x.numero))
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
      return this.cartas.filter(x => 'ataque' in x && listaIdsCartasAInvocar.includes(x.numero))
    }

    getCartasOrdenadasPorAtaque(){
      return this.cartas.filter(x => 'ataque' in x).sort((a, b) => (a.ataque > b.ataque) ? 1 : -1)
    }
}


module.exports = Mano