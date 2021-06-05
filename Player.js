class Player{
    constructor(image){
        this.maxMana = 0;
        this.mana = 0;
        this.life = 30;
        this.image = loadImage(image);
        this.sprite = createSprite(1750, 800, 1000, 1000);
        this.sprite.addImage(this.image)
        this.sprite.scale = 3;
    }
    
    checkTargetedCombat(){

        if(mousePressedOver(this.sprite) && attackInitiated === true){
  
            Combat.attackPlayer(attacker, this);
            attackInitiated = false;
  
        }

    }

    display(x, y, x2, y2, x3, y3){

        this.sprite.x = x;
        this.sprite.y = y;
        stroke(4)
        textSize(50);
        text(this.mana + "/" + this.maxMana, x2, y2);
        text(this.life, x3, y3);
        //text();
          
    }
}
