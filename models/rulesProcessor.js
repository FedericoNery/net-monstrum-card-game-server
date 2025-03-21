class RulesProcessor {
    constructor(){
        this.resolver = null
    }

    executeRules(rules, game){
        for (let index = 0; index < rules.length; index++) {
            const rule = rules[index];
            this.executeRule(rule, game)
            
        }
    }

    executeRule(rule, game){
        const action = rule.action
        if(action === "SEND_TO_TRASH"){

        }
        if(action === "SEND_TO_FIELD"){

        }
        if(action === "SEND_TO_HAND"){

        }
        if(action === "SEND_TO_ENEMY_HAND"){

        }
        if(action === "SEND_TO_ENEMY_FIELD"){

        }
        if(action === "SEND_TO_ENEMY_TRASH"){

        }
        if(action === "DEAL_DAMAGE_TO_ENEMY_FIELD"){ //PODRIA SER DEAL_DAMAGE y que en targetZone sea ENEMY FIELD FIELD, ETC.

        }
    }

    sendToTrash(rule, game){
        if(rule.targetZone === "ENEMY_FIELD"){
            const quantity = rule.quantity
            if(quantity === "All"){
                game.enemyField.sendToTrashIfAchieveFilters(rule.targetColors, rule.targetTypeCard)
            }
            else{
                game.enemyField.sendToTrashByQuantityIfAchieveFilters(quantity, rule.targetColors, rule.targetTypeCard)
            }
        }
        if(rule.targetZone === "FIELD"){

        }
        if(rule.targetZone === "ENEMY_SUMMON_PROGRAMMING_ZONE"){

        }
        if(rule.targetZone === "HAND"){}

    }

    sendToField(rule, game){
        if(rule.targetZone === "ENEMY_FIELD"){}
        if(rule.targetZone === "HAND"){}

    }

    sendToHand(rule, game){
        if(rule.targetZone === "TRASH"){}
        if(rule.targetZone === "DECK"){}
        if(rule.targetZone === "HAND"){}

    }

    sendToEnemyHand(rule, game){
        if(rule.targetZone === "ENEMY_FIELD"){}
    }

    sendToEnemyField(rule, game){

    }
    
    sendToEnemyTrash(rule, game){
        if(rule.targetZone === "ENEMY_FIELD"){}
        if(rule.targetZone === "ENEMY_SUMMON_PROGRAMMING_ZONE"){}
        if(rule.targetZone === "ENEMY_HAND"){}
        if(rule.targetZone === "ENEMY_DECK"){}
    }
    sendToDeck(rule, game){
        if(rule.targetZone === "TRASH"){}

    }
    dealDamageToEnemyField(rule, game){
        if(rule.targetZone === "ENEMY_FIELD"){

        }
    }
}

//falta agregar lo de Form of Action si es a seleccion (osea le pasas los ids de las cartas afectadas, o si es aleatorio)