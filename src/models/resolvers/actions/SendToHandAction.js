import { RuleAction } from "../RuleAction";


class SendToHandAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        if(this.rule.targetZone === "HAND"){
            throw new Error("Cannot send to hand from hand")
        }
        if(this.rule.targetZone === "TRASH"){
            this.game.field1.trash.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "DECK"){
            this.game.field1.deck.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "SUMMON_PROGRAMMING_ZONE"){
            this.game.field1.summonProgrammingZone.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "FIELD"){
            this.game.field1.digimonZone.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_FIELD"){
            this.game.field2.digimonZone.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_SUMMON_PROGRAMMING_ZONE"){
            this.game.field2.summonProgrammingZone.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_HAND"){
            this.game.field2.hand.sendToHand(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_DECK"){
            this.game.field2.deck.sendToHand(this.rule)
        }
    }
}

module.exports = SendToHandAction;
