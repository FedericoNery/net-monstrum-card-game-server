import { RuleAction } from "../RuleAction";


class SendToEnemyTrashAction extends RuleAction {
	constructor(rule, game) {
        super(rule, game)
        this.rule = rule
        this.game = game
    }

    execute() {
        
    }
}

module.exports = SendToEnemyTrashAction;
