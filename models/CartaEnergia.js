const Carta = require("./Carta")

class CartaEnergia extends Carta {
    constructor(numero, nombre, energias) {
      super(numero, nombre);
      this.energias = energias;
    }
  }

module.exports = CartaEnergia