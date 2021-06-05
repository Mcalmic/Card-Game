// I use else if instead of else in the turn instances just in case I want to make a system with more than 2 players later.
// Most of the lines that are commented are either test stuff or unused features.
var cardsInHand = [];
var cardsInDeck = [];
var player2CardsInHand = [];
var player2CardsInDeck = [];
var creaturesOnBoardInt = 0;
var creaturesOnBoard = [];
var player2CreaturesOnBoard = [];
var tempCreaturesOnBoard = [];
var tempCardsInHand = [];
var tempCardsInDeck = [];
//var cardsInExile = [];
var attackInitiated = false;
var targetingInitiated = false;
var attacker = null;
var hasCasted = false;
//this is the local multiplayer system
var turn = 1;
var turnsElapsed = 0;
var effectText = ''

var gameState = 'playing';
function preload(){

  playerImage = loadImage("./Assets/Miscellaneous/Player.png");
  
}

function setup() {
  createCanvas(displayWidth, displayHeight - displayHeight/7.5);  
  for(i = 0; i < 11; i++){
    card = new Card (round(random(1, 4)), 1);
    card = new Card (round(random(10, 14)), 1);


  }
  for(i = 0; i < 11; i++){

    card = new Card (round(random(1, 4)), 2);
    card = new Card (round(random(10, 14)), 2);


  }
  player2 = new Player("./Assets/Miscellaneous/Player.png");
  player1 = new Player("./Assets/Miscellaneous/Player.png");
  player1.life = 30;
  player1.maxMana = 1;
  player1.mana = 1;
  player1.scale = 3;
  Deck.shuffle(cardsInDeck);
  Deck.drawCard(1);
  //player1.sprite.debug = true;
  //console.log(cardsInHand + "cards in hand");
  //console.log(creaturesOnBoard + "cards on board");
}

function draw() { 
  background(255);  
  //creaturesOnBoard[creaturesOnBoard.length - 1].displayOnBoard();
  if(keyWentDown("F")){

    console.log(cardsInHand);
    console.log(player2CardsInHand)

  }
  if(keyWentDown("E")){

    newTurn();
    attackInitiated = false;

  }
  if(keyWentDown("R")){
    console.log("you are drawing a card")
    console.log(cardsInDeck.length)
    Deck.drawCard(1);

  }
  if(gameState === 'playing'){
    if(attackInitiated){

      console.log("attack")

    }
    textSize(26)
    text(effectText, 1700, 425, 200, 200)
    displayHandEffects();
    displayHand(); 
    removeBoardSprites(); 
    displayBoard();
    drawSprites();
    checkCastedInHand();
    checkInitiatedCombatBoard();
    checkDie();
    player1.display(1750, 800, 1700, 720, 1705, 670);
    player1.checkTargetedCombat();
    player2.display(1750, 100, 1700, 200, 1705, 250);
    player2.checkTargetedCombat();
    if(hasCasted === true){

      attackInitiated = false;
      hasCasted = false;

    }
    if(player1.life <= 0){
      gameState = 'player2Win'
    } else if(player2.life <= 0){
      gameState = 'player1Win'
    }
  } else if (gameState === 'player1Win'){
    textSize(26)
    background(255)
    text('Player 1 Wins.', 800, 500)
  } else if (gameState === 'player2Win'){
    textSize(26)
    background(255)
    text('Player 2 Wins.', 800, 500)
  } else if (gameState === 'inbetweenTurns'){
    textSize(26)
    background(255)
    text('Press P to move to the next turn.', 800, 500)
  if(keyWentDown("P")){
      if(turn === 1){
        turn = 2;
        gameState = 'playing';
      } else if(turn === 2){
        turn = 1;
        gameState = 'playing';
      }
    }
  }


}
function changeLife(player, amount){
  if(turn === 1){
    if(player === 1){
      player1.life += amount;
    } else if(player === 2){
      player2.life += amount;
    }
  }
  if(turn === 2){
    if(player === 1){
      player2.life += amount;
    } else if(player === 2){
      console.log(player1.life)
      player1.life += amount;
    }
  }
}
function newTurn(){
  gameState = 'inbetweenTurns'
  if(turn === 1){ 
    player2.maxMana++;
    player2.mana = player2.maxMana;
    Deck.drawCard(1);
    for(i = 0; i < creaturesOnBoard.length; i++){
    
      creaturesOnBoard[creaturesOnBoard.length - (i + 1)].hasAttacked = false;

    }
  } else if (turn === 2){
    player1.maxMana++;
    player1.mana = player1.maxMana;
    Deck.drawCard(1);
    for(i = 0; i < creaturesOnBoard.length; i++){
    
      creaturesOnBoard[creaturesOnBoard.length - (i + 1)].hasAttacked = false;

    }
  }
  swapPlayers();
}

function displayHand(){
  for(i = 0; i < cardsInHand.length; i++){

    if(cardsInHand[cardsInHand.length - (i + 1)].sprite != null){
      
      cardsInHand[cardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < cardsInHand.length; i++){
    
    cardsInHand[cardsInHand.length - (i + 1)].displayInHand();

  }
}

function displayHandEffects(){
  for(i = 0; i < cardsInHand.length; i++){
    
    cardsInHand[cardsInHand.length - (i + 1)].displayEffects();

  }
}

function displayBoard(){
  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].displayOnBoard();

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].displayOnBoard();

  }
}
//these are basically the same ones
function checkCastedInHand(){

  for(i = 0; i < cardsInHand.length; i++){

    cardsInHand[cardsInHand.length - (i + 1)].checkCasted();

  }

}

function checkDie(){

  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkDie();

  }

  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].checkDie();

  }
}

function checkInitiatedCombatBoard(){

  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkInitiatedCombat();

  }
  for(i = 0; i < creaturesOnBoard.length; i++){
    
    creaturesOnBoard[creaturesOnBoard.length - (i + 1)].checkTargetedCombat();

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){
    
    player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].checkTargetedCombat();

  }

}

function notInAction(){

  //this is just a shorthand function that returns a boolean figuring out if you're in the middle of attacking or something similar.
  // returning true means that no action is currently waiting to be resolved and it is your turn. 
  //this function is an all in one for every if function
  if(targetingInitiated === false && attackInitiated === false){
    
    return true;

  } else {

    return false;

  }

}

function mouseWentDownOver(sprite){

  if(World.mouseX < sprite.x + 0.5*sprite.width && World.mouseX > sprite.x - 0.5*sprite.width 
    && World.mouseY < sprite.y + 0.5*sprite.height && World.mouseY > sprite.y - 0.5*sprite.height 
    && mouseWentDown()){
      return true;

  }
}

function swapPlayers(){

  for(i = 0; i < player2CardsInHand.length; i++){

    if(player2CardsInHand[player2CardsInHand.length - (i + 1)].sprite != null){
      
      player2CardsInHand[player2CardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < cardsInHand.length; i++){

  if(cardsInHand[cardsInHand.length - (i + 1)].sprite != null){
      
      cardsInHand[cardsInHand.length - (i + 1)].sprite.remove();

    }

  }
  tempCreaturesOnBoard = player2CreaturesOnBoard;
  player2CreaturesOnBoard = creaturesOnBoard;
  creaturesOnBoard = tempCreaturesOnBoard;
  tempCreaturesOnBoard = [];

  tempCardsInHand = player2CardsInHand;
  player2CardsInHand = cardsInHand; 
  cardsInHand = tempCardsInHand;
  tempCardsInHand = [];

  tempCardsInDeck = player2CardsInDeck;
  player2CardsInDeck = cardsInDeck; 
  cardsInDeck = tempCardsInDeck;
  tempCardsInDeck = [];

}
function isOnBoard(creature){

  if(creaturesOnBoard.includes(creature) || player2CreaturesOnBoard.includes(creature)){

    return true;

  }

}
function removeBoardSprites(){

  for(i = 0; i < creaturesOnBoard.length; i++){

    if(creaturesOnBoard[creaturesOnBoard.length - (i + 1)].sprite != null){
      
      creaturesOnBoard[creaturesOnBoard.length - (i + 1)].sprite.remove();

    }

  }
  for(i = 0; i < player2CreaturesOnBoard.length; i++){

    if(player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].sprite != null){
      
      player2CreaturesOnBoard[player2CreaturesOnBoard.length - (i + 1)].sprite.remove();

    }

  }

}

function killLastEntered(){
    creaturesOnBoard.pop()
}
