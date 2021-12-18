var rosquinha;
var fundo,fundo1;
var inimigo1, inimigo2;
var modoJogo ="jogar";



function preload(){
    inimigo1 = loadAnimation("maça.png");
    inimigo2 = loadAnimation("brocolis.png");
    fundo1 = loadImage("fundoo.png");
    rosquinha = loadAnimation("rosquinha2.png","rosquinha3.png");
    morte = loadAnimation("Hurt_rosquinha.png");
    GameOver = loadImage("Game_Over.png");
    planeta=loadImage("planeta11.png");
    planetaA=loadImage("planeta12.png");
    planetaB=loadImage("planeta13.png");
    restart=loadImage("restart.png");
}

function setup(){
    createCanvas(600,400);
    
   planeta1=createSprite(100,100);
   planeta1.addImage("p1",planeta);
   planeta1.scale = 0.4
   planeta1.velocityX = -0.5;

   planeta2=createSprite(550,200);
   planeta2.addImage("p2",planetaA);
   planeta2.scale = 0.4
   planeta2.velocityX = -0.5

   planeta3=createSprite(300,250);
   planeta3.addImage("p3",planetaB);
   planeta3.scale = 0.4
   planeta3.velocityX = -0.5

   fundo = createSprite(300,200);
   fundo.addImage("espaço",fundo1);

   rosca = createSprite(150,330,10,10);
   rosca.addAnimation("rosquinha",rosquinha);
   rosca.addAnimation("rosquinha morta",morte);
   rosca.scale = 0.2;
   
   soloInvisivel = createSprite(300,370,600,10);
   soloInvisivel.visible = false;   

   over= createSprite(300,100);
   over.addImage("game",GameOver);

   reset= createSprite(300,200);
   reset.addImage("r",restart);
   reset.scale =0.8;

   grupodeinimigos = new Group();
}

function draw(){
    background("black");
    

 if (modoJogo==="jogar"){
    if (keyDown("space")&& rosca.y>=250) {
        rosca.velocityY = -5;}
        rosca.velocityY = rosca.velocityY + 0.5; 
        fundo.velocityX = -3;
       //chão infinito
        if(fundo.x<230){
            fundo.x = 350;
        }    
        if(planeta1.x<-50){
            planeta1.x = 800;
        }   
        if(planeta2.x<-50){
            planeta2.x = 800;
        }   
        if(planeta3.x<-50){
            planeta3.x = 800;
        }  

        inimigos();
        if(grupodeinimigos.isTouching(rosca)){
        modoJogo = "gameOver"; 
        }
        over.visible = false;
        reset.visible = false;
 }
 
 if (modoJogo==="gameOver"){
rosca.velocityY=0;
fundo.velocityX=0;
grupodeinimigos.setVelocityXEach(0);
grupodeinimigos.setLifetimeEach(-1);
rosca.changeAnimation("rosquinha morta",morte);
over.visible = true; 
planeta1.velocityX=0;
planeta2.velocityX=0;
planeta3.velocityX=0;
reset.visible = true;
if(mousePressedOver(reset)) { 
    resetar();
 }
 }
 rosca.collide(soloInvisivel);
 
    drawSprites();
}

function resetar(){
    modoJogo="jogar"
    grupodeinimigos.destroyEach();
    rosca.changeAnimation("rosquinha",rosquinha);
}


function inimigos(){
    if (frameCount%100===0){
        inimigo_1 = createSprite(550,330,10,10);
        inimigo_1.velocityX = -6;
        inimigo_1.scale = 0.2;
        aleatorio = Math.round(random(1,2))
        switch(aleatorio){
            case 1:inimigo_1.addAnimation("maça",inimigo1);
                break;
            case 2:inimigo_1.addAnimation("brocolis ",inimigo2);
                break;
        }
     inimigo_1.lifetime = 100;
     grupodeinimigos.add(inimigo_1);
    }

}