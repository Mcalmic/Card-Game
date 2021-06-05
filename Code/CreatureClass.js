class CreatureClass{
    constructor(cost, power, defense, image, id, owner){
        //owner is 1 if it's you and 2 if it's your opponent
        //this class automatically puts the card into your deck
        this.cost = cost;
        this.power = power;
        this.defense = defense;
        this.owner = owner;
        // the id is used to identify which effect to use when this is cast.
        this.id = id;
        this.image = loadImage(image);
        this.hasAttacked = false;
        if(turn === 1){
            if(owner === 1){
                cardsInDeck.push(this);
            } else {
                player2CardsInDeck.push(this);
            }
        } else if(turn === 2){
            // don't get confused, if turn is 2 the if statement checks if the owner is player 2
            if(owner === 2){
                cardsInDeck.push(this);
            } else {
                player2CardsInDeck.push(this);
            }
        }
    }

    cast(){
        console.log(this.image);
        if(cardsInHand.includes(this)){
            if(creaturesOnBoard.length < 6){
                    console.log("You just casted a card") 
                    if(turn === 1){
                        player1.mana -= this.cost;
                    } else if(turn === 2){
                        player2.mana -= this.cost;
                    }
                    this.sprite.remove();
                    cardsInHand.splice(cardsInHand.indexOf(this), 1);
                    this.sprite.addImage(this.image);
                    this.sprite.scale = 3;
                    //I'm putting checkIdEffect after putting it on board becuase i'm too lazy to make a spell class and
                    //I'm just making spells creatures that self destruct
                    //Yes, I am aware that this would make spells limited by the creature cap on board
                    //But I don't have enough time to fix that right now
                    creaturesOnBoard.push(this);
                    Card.checkIDEffect(this.id);
                    hasCasted = true;
            } else {

                    console.log("The board is out of space.")

            }
        }
    }
    
    displayEffects(){
        if(mouseIsOver(this.sprite) && cardsInHand.includes(this)){
            console.log('hovering over')
            Card.displayEffects(this.id);
        }
    }

    displayOnBoard(){
        textSize(48)
        if(turn === 1){
            if(this.owner === 1){
                this.sprite = createSprite((creaturesOnBoard.indexOf(this)*200) + 100, 500, 100, 150);
                text(this.power, creaturesOnBoard.indexOf(this)*200 + 55, 575);
                text(this.defense, creaturesOnBoard.indexOf(this)*200 + 105, 575);
            } else if(this.owner === 2){
                this.sprite = createSprite((player2CreaturesOnBoard.indexOf(this)*200) + 100, 100, 100, 150);
                text(this.power, player2CreaturesOnBoard.indexOf(this)*200 + 55, 175);
                text(this.defense, player2CreaturesOnBoard.indexOf(this)*200 + 105, 175);
            }
            this.sprite.addImage(this.image);
            this.sprite.scale = 3;

        } else if (turn === 2) {
            if(this.owner === 1){
                this.sprite = createSprite((player2CreaturesOnBoard.indexOf(this)*200) + 100, 100, 100, 150);
                text(this.power, player2CreaturesOnBoard.indexOf(this)*200 + 55, 175);
                text(this.defense, player2CreaturesOnBoard.indexOf(this)*200 + 105, 175);
            } else if(this.owner === 2){
                this.sprite = createSprite((creaturesOnBoard.indexOf(this)*200) + 100, 500, 100, 150);
                text(this.power, creaturesOnBoard.indexOf(this)*200 + 55, 575);
                text(this.defense, creaturesOnBoard.indexOf(this)*200 + 105, 575);
            }
            this.sprite.addImage(this.image);
            this.sprite.scale = 3;

        }

    }

    displayInHand(){
        textSize(48)
        this.sprite = createSprite((cardsInHand.indexOf(this)*200) + 100, 800, 100, 150);
        text(this.power, cardsInHand.indexOf(this)*200 + 55, 875);
        text(this.defense, cardsInHand.indexOf(this)*200 + 105, 875);
        //this.sprite.debug = true;
        this.sprite.addImage(this.image);
        this.sprite.scale = 3;
    }

    takeDamage(amountDamage){

        this.defense -= amountDamage;

    }

    die(){

        creaturesOnBoardInt -= 1;
        this.sprite.remove();
        if((this.owner === 2 && turn === 1) || (this.owner === 1 && turn === 2)){
            player2CreaturesOnBoard.splice(player2CreaturesOnBoard.indexOf(this), 1);
        } else {
            creaturesOnBoard.splice(creaturesOnBoard.indexOf(this), 1);
        }

    }

    checkCasted(){
        if(turn === 1){
            if(this.sprite != null){
                if(mouseWentDownOver(this.sprite) && cardsInHand.includes(this) && notInAction() && player1.mana >= this.cost){

                    this.cast();

                }
            }
        } else if (turn === 2){
            if(this.sprite != null){
                if(mouseWentDownOver(this.sprite) && cardsInHand.includes(this) && notInAction() && player2.mana >= this.cost){

                    this.cast();

                }
            }
        }
    }

    checkInitiatedCombat(){
        if(mouseWentDownOver(this.sprite) && isOnBoard(this)
        && notInAction() === true && this.hasAttacked === false){
      
          attacker = this;
          attackInitiated = true;
          this.hasAttacked = true;
      
        }

    }

    checkTargetedCombat(){
        if(mousePressedOver(this.sprite) && isOnBoard(this) && attackInitiated === true && attacker != this){
      
          Combat.attack(attacker, this);
          attackInitiated = false;
      
        }

    }

    checkDie(){

        if(this.defense <= 0){

            this.die();

        }

    }

}