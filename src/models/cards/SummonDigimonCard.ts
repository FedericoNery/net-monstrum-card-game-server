import Card from "./Card";
import DigimonCard from "./DigimonCard";

class SummonDigimonCard extends Card {
    digimonsCards: DigimonCard[];

    constructor(id: string, name: string, type: string, digimonsCards: DigimonCard[]) {
        super(id, name, type);
        this.digimonsCards = digimonsCards;
    }
}

export default SummonDigimonCard;
