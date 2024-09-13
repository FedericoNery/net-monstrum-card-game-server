class Trash {
    constructor(cartas) {
      this.cartas = cartas;
    }
    agregarCarta(carta){
      this.cartas.push(carta)
    }

    agregarCartas(cards){
      for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        this.agregarCarta(element)
      }
    }
}


export default Trash