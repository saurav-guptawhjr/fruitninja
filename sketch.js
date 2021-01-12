var PLAY=1
var END=0
var gamestate=1

var sword,sworda,apple,banana,kiwi,mango,applea,bananaa,kiwia,mangoa,bomb,bomba,fruit,fruitGroup,enemyGroup,score,gameOverImage
var knifeSound,gameoverSound
function preload(){
  sworda=loadImage("sword.png")
 bananaa=loadImage("fruit1.png")
   appleaa=loadImage("fruit2.png")
   kiwia=loadImage("fruit3.png")
   mangoa=loadImage("fruit4.png")
   bomba=loadAnimation("alien1.png","alien2.png")
  gameOverImage=loadImage("gameover.png")
  knifeSound=loadSound("knife.mp3")
  gameoverSound=loadSound("gameover.mp3")
}

function setup(){
  createCanvas(600,600)
  
  sword=createSprite(100,400);
  sword.addImage(sworda);
  sword.scale=0.7;
  sword.debug = true;
  //sword.setCollider("rectangle",0,0,40,40)
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
}


function draw(){
background("orange")
  
  if(gamestate===PLAY){
   
   
  sword.x=World.mouseX
  sword.y=World.mouseY
  fruits()
  enemy()   
    
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      
      knifeSound.play();
      score+=2
    }
  }
    
    if(enemyGroup.isTouching(sword)){
      gamestate=END;
      gameoverSound.play();
      console.log("end");
      
      fruitGroup.destroyEach()
      enemyGroup.destroyEach()
      fruitGroup.setVelocityXEach(0)
      enemyGroup.setVelocityXEach(0)
      console.log("swordimage before")
      sword.addImage(gameOverImage)
       console.log("swordimage after")
      sword.x = 300;
     sword.y = 200;
     
  }
    drawSprites()
    text("SCORE:"+score,300,30)
  }

function enemy(){
  if(World.frameCount%100==0){
    bomb=createSprite(500,200,20,20)
    bomb.addAnimation("s",bomba)
    bomb.y=Math.round(random(100,300))
    bomb.velocityX=-(8+(score/10))
    bomb.setLifetime=50
    enemyGroup.add(bomb)
  }
}
function fruits(){
if(World.frameCount%50==0){
  fruit=createSprite(400,200,20,20)
  fruit.scale=0.2
  
  var select=Math.round(random(1,4))
  if(select==1){
    fruit.addImage(applea)
  }
  if(select==2){
    fruit.addImage(bananaa)
  }
  if(select==3){
    fruit.addImage(kiwia)
  }
  if(select==4){
    fruit.addImage(mangoa)
  }
  fruit.y=Math.round(random(50,350))
  fruit.velocityX=-(5+(score/5))
  fruit.setLifetime=100
  fruitGroup.add(fruit)
}  
}