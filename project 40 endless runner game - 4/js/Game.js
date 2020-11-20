class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    finish = createSprite(displayWidth*6+1500, 380);
    finish.addImage(finishImg);
    finish.scale = 1;
    bunny1 = createSprite(100,100); 
    bunny2 = createSprite(100,300);
    bunny3 = createSprite(100,500);
        //bunny4 = createSprite(700,200);
    bunny1.addAnimation("running1",bunny1ab);
    bunny2.addAnimation("running2",bunny2ab);
    bunny3.addAnimation("running3",bunny3ab);
    bunnys = [bunny1,bunny2,bunny3];
  }  



  play(){
    form.hide();
    textSize(50);
    fill("green")
    text("Game Start", 850, 130);
    text("S",1500,200);
    text("T",1500,300);
    text("A",1500,400);
    text("R",1500,500);
    text("T",1500,600);
    

    Player.getPlayerInfo();

    player.getCarsAtEnd();

    if(allPlayers !== undefined){
    background(128,128,128);
    image(track ,1300, 0 ,displayWidth*6,displayHeight);
    track.scale=0.2;
 
      var index = 0;
      var y = 0;
      var x;
      for(var plr in allPlayers){
        index = index+1;
        y = y + 190;
        x = displayWidth - allPlayers[plr].distance;
        bunnys[index-1].x = x;
        bunnys[index-1].y = y;

        if(index === player.index){
          stroke("pink");
          fill(179, 227, 198);
          strokeWeight(15);
          ellipse(x,y+7,100,100);
          bunnys[index-1].shapeColor="purple";
          camera.position.y = displayHeight/2;
          camera.position.x = bunnys[index-1].x;
        }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=50;
      player.update();
    }
    //console.log(player.distance);

    if(player.distance < -8300){
      gameState = 2;
      player.rank = player.rank+1;
      Player.updateCarsAtEnd(player.rank);
    }

    drawSprites();
  }

  end(){
      console.log('Game Ended');
      game.update(2);
      console.log(player.rank);
    }

}
