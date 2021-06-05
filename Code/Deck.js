class Deck {

    constructor(){



    }

    static drawCard(number){
        for(var i = 0; i < number; i++){
            if(cardsInHand.length <= 6){    
                if(cardsInDeck.length > 0){
                    //sets max hand size to 7
                    cardsInHand.push(cardsInDeck[cardsInDeck.length-1]);
                    cardsInDeck.pop();
                } else {

                    console.log("I can't believe you've run out of cards")

                }
            }
        }
    }

    static shuffle(array){
        var currentIndex = array.length, temporaryValue, randomIndex;
          
        // While there remain elements to shuffle...
         while (0 !== currentIndex) {
          
          // Pick a remaining element...
             randomIndex = Math.floor(Math.random() * currentIndex);
             currentIndex -= 1;
          
             // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
             array[randomIndex] = temporaryValue;
         }
          
           return array;
    }
}