import Card from "./Card"

class EnergyCard extends Card {
    constructor(id, name, type, energyCount) {
      super(id, name, type,);
      this.energyCount = energyCount;
    }
  }

export default EnergyCard