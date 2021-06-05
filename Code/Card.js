//this class is to store the massive amount of cases for the switch
class Card {

    constructor(cardID, owner){
        switch(cardID){
            case 1:
                //Fireblast
                new SpellClass(7, "../Assets/Card_Art/Fireblast.png", 1, owner);
                break;
            case 2:
                //Lightning Bolt
                new SpellClass(3, "../Assets/Card_Art/Lightning_Bolt.png", 2, owner);
                break;
            case 3:
                //Ice Shards
                new SpellClass(1, "../Assets/Card_Art/Ice_Shards.png", 3, owner);
                break;
            case 4:
                //Health Potion
                new SpellClass(2, "../Assets/Card_Art/Health_Potion.png", 4, owner);
                break;
            case 10:
                //Phalanx
                new CreatureClass(2, 1, 8, "../Assets/Card_Art/Phalanx.png", 10, owner);
                break;
            case 11:
                //Swordsman
                new CreatureClass(2, 5, 3, "../Assets/Card_Art/Swordsman.png", 11, owner);
                break;
            case 12:
                //Stormcaller
                new CreatureClass(4, 4, 1, "../Assets/Card_Art/Stormcaller.png", 12, owner);
                break;
            case 13:
                //Miner
                new CreatureClass(3, 2, 3, "../Assets/Card_Art/Miner.png", 13, owner);
                break;
            case 14:
                //Scholar
                new CreatureClass(3, 1, 3, "../Assets/Card_Art/Scholar.png", 14, owner);
                break;
        }
    }
    static checkIDEffect(cardID){
      //if this works because the owner is checked when this is called
      switch(cardID){
        case 1:
            //Fireblast
            changeLife(2, -10)
            break;
        case 2:
            //Lightning Bolt
            changeLife(2, -5)
            break;
        case 3:
            //Ice Shards
            changeLife(2, -2)
            break;
        case 4:
            //Health Potion
            changeLife(1, 5)
            break;            
        case 10:
            //Phalanx
            break;
        case 11:
            //Swordsman
            break;
        case 12:
            //Stormcaller
            if(turn === 1){
              card = new Card(2, 1);
            } else if(turn === 2){
            card = new Card(2, 2);
            }
            Deck.drawCard(1);
            break;
        case 13:
            //Miner
            if(turn === 1){
                player.maxMana++
            } else if(turn === 2){
                player2.maxMana++
            }
            break;
        case 14:
            //Scholar
            Deck.drawCard(1);
                break;
      }
    }
    static displayEffects(cardID){
        switch(cardID){

            case 1:
                //Fireblast
                effectText = '"Fireblast"   Cost: 7   Deal 10 damage to your opponent.'
                break;
            case 2:
                //Lightning Bolt
                effectText = '"Lightning Bolt"   Cost: 3   Deal 5 damage to your opponent.'
                break;
            case 3:
                //Ice Shards
                effectText = '"Ice Shards"   Cost: 1   Deal 2 damage to your opponent.'
                break;
            case 4:
                //Health Potion
                effectText = '"Health Potion"   Cost:2   You gain 5 life.'
                break;
            case 10:
                //Phalanx
                effectText = '"Phalanx"   Cost: 2   No special effects.'
                break;
            case 11:
                //Swordsman
                effectText = '"Swordsman   Cost: 2   No special effects.'
                break;
            case 12:
                //Stormcaller
                effectText = '"Stormcaller"   Cost: 4   Add 1 copy of \'Lightning Bolt\' to your hand.'
                break;
            case 13:
                //Miner
                effectText = '"Miner"   Cost: 3   Gain 1 max mana.'
                break;
            case 14:
                //Scholar
                effectText = '"Scholar"   Cost: 3   Draw a card.'
                break;
        }
    }
}