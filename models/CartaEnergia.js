import Carta from "./Carta"

class CartaEnergia extends Carta {
    constructor(numero, nombre, energias) {
      super(numero, nombre);
      this.energias = energias;
    }
  }

export default CartaEnergia