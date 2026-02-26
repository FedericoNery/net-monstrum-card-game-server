import { RuleAction } from "../RuleAction";

class SendToTrashAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        if(this.rule.targetZone === "TRASH"){
            throw new Error("Cannot send to trash from trash")
        }
        if(this.rule.targetZone === "DECK"){
            this.game.field1.deck.sendToTrash(this.rule)
            
            // un diccionario o if, si es ONE o ALL 
            // quitar la carta de la zona
            // y agregarla a la zona de trash

            // form action
            // si es random una carta que cumpla la condicion
            // si es NOT APPLY no pasa nada
            // si es selected (pero no ve la carta)
            // podría haber un SELECTED DISPLAYED o algo así a futuro
        }
        if(this.rule.targetZone === "HAND"){
            this.game.field1.hand.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "SUMMON_PROGRAMMING_ZONE"){
            this.game.field1.summonProgrammingZone.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "FIELD"){
            this.game.field1.digimonZone.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_FIELD"){
            this.game.field2.digimonZone.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_SUMMON_PROGRAMMING_ZONE"){
            this.game.field2.summonProgrammingZone.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_HAND"){
            this.game.field2.hand.sendToTrash(this.rule)
        }
        if(this.rule.targetZone === "ENEMY_DECK"){
            this.game.field2.deck.sendToTrash(this.rule)
        }
    }
}

module.exports = SendToTrashAction;