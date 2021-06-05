class SpellClass{
    constructor(cost, image, id, owner){
        //owner is 1 if it's you and 2 if it's your opponent
        //this class automatically puts the card into your deck
        this.cost = cost;
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
            console.log("You just casted a card") 
            if(turn === 1){
                player1.mana -= this.cost;
            } else if(turn === 2){
                player2.mana -= this.cost;
            }
            this.sprite.remove();
            cardsInHand.splice(cardsInHand.indexOf(this), 1);
            Card.checkIDEffect(this.id);
            hasCasted = true;
        }
    }    
    displayEffects(){
        if(mouseIsOver(this.sprite) && cardsInHand.includes(this)){
            console.log('hovering over')
            Card.displayEffects(this.id);
        }
    }

    //displayOnBoard(){
    //}

    displayInHand(){
        this.sprite = createSprite((cardsInHand.indexOf(this)*200) + 100, 800, 100, 150);
        //this.sprite.debug = true;
        this.sprite.addImage(this.image);
        this.sprite.scale = 3;
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
}