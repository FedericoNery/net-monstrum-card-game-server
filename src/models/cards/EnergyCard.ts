import Card from "./Card";

class EnergyCard extends Card {
    energyCount: number;

    constructor(id: string, name: string, type: string, energyCount: number) {
        super(id, name, type);
        this.energyCount = energyCount;
    }
}

export default EnergyCard;
