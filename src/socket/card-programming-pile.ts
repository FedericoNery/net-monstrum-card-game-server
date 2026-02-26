import ProgrammingCard from "../models/cards/ProgrammingCard";
import { RulesQueue } from "./rules-queue";

export class CardProgrammingPile {
    private programmingCards: ProgrammingCard[] = [];
    private rulesQueue: RulesQueue;
    constructor() {
        this.rulesQueue = new RulesQueue();
    }

    addProgrammingCard(card: ProgrammingCard): void {
        this.programmingCards.push(card);
    }

    removeProgrammingCard(cardId: string): void {
        this.programmingCards = this.programmingCards.filter(card => card.id !== cardId);
    }

    getProgrammingCards(): ProgrammingCard[] {
        return this.programmingCards;
    }

    clearPile(): void {
        this.programmingCards = [];
    }

    processPile(): void {
        while (this.programmingCards.length > 0) {
            // Process each programming card in the pile
            const card = this.programmingCards.pop();
            if (!card) continue;

            if(card.rules.map(rule => rule.action).includes("INSTANT_SEND_TO_TRASH")) {
                
            }
            this.rulesQueue.playProgrammingCard(card);
        }
    }
}