class Combat {
    //I put my combat functions in here
    constructor(){



    }

    static attack(creature1, creature2){
        console.log(creature1.power, creature1.defense, creature2.power, creature2.defense, "values");
        creature1.takeDamage(creature2.power);
        creature2.takeDamage(creature1.power);
        console.log(creature1.power, creature1.defense, creature2.power, creature2.defense, "values");
        creature1.hasAttacked = true;

    }

    static attackPlayer(creature, player){

        player.life -= creature.power;

    }
}