$(function(){
   var container = $('#container');
   var bird = $('#bird');
   var pole = $('.pole');
   var pole1 = $('#pole1');
   var pole2 = $('#pole2');
    var score = $('#score');
    var speedSpan = $('#speed');
    var restartBtn = $('#restartBtn');
    
    var containerWidth = parseInt(container.width());
    var containerHeight = parseInt(container.height());
    var poleInitialPosition = parseInt(pole.css('right'));
    var poleInitialHeight = parseInt(pole.css('height'));
    var birdLeft = parseInt(bird.css('left'));
    var birdHeight = parseInt(bird.height());
    
    var speed = 10;
    var scoreUpdate = false;
    var goUp = false;
    var gameOver = false;

    //TODO: authorization via facebook,  db(txt file) with table records, read and write JSONs.
    
    var theGame = setInterval(function(){
        
        if(collision(bird, pole1)||collision(bird,pole2) || parseInt(bird.css('top')) <=0 || parseInt(bird.css('top')) > containerHeight - birdHeight){
            stopTheGame();
        }else{
            
        var poleCurPos = parseInt(pole.css('right'));
            
            
        if (poleCurPos > containerWidth - birdLeft){
           if(!scoreUpdate) {
               score.text(parseInt(score.text()) + 1);
               scoreUpdate = true;
           }
        }
        
        if(poleCurPos > containerWidth){
            
            var newHeight = parseInt(Math.random()*100);
            
            pole1.css('height', poleInitialHeight + newHeight);
            pole2.css('height', poleInitialHeight - newHeight);
            
            speed = speed + 1;
            speedSpan.text(speed);
            
            scoreUpdate = false;

            poleCurPos = poleInitialPosition;
        }    
        
    
        pole.css('right', poleCurPos + speed);
        
        if(!goUp){
            goDown();
        }
  }
       
        
    }, 40);
    
    $(document).on('keydown', function(e){
        var key = e.keyCode;
        if(key ===32 && goUp === false && gameOver ===false){
            goUp = setInterval(up, 50);
            
        }
    });
    
       $(document).on('keyup', function(e){
        var key = e.keyCode;
        if(key ===32){
            clearInterval(goUp);
            goUp = false;
            
        }
    });

    
    function goDown(){
        bird.css('top', parseInt(bird.css('top')) + 5);
    }
    
    function up(){
        bird.css('top', parseInt(bird.css('top')) - 7);
    }
    
    function stopTheGame(){
        clearInterval(theGame);
        gameOver = true;
        restartBtn.slideDown();
    }
    
    restartBtn.click(function(){
       location.reload(); 
    });
    
      function collision($div1, $div2) {
      var x1 = $div1.offset().left;
      var y1 = $div1.offset().top;
      var h1 = $div1.outerHeight(true);
      var w1 = $div1.outerWidth(true);
      var b1 = y1 + h1;
      var r1 = x1 + w1;
      var x2 = $div2.offset().left;
      var y2 = $div2.offset().top;
      var h2 = $div2.outerHeight(true);
      var w2 = $div2.outerWidth(true);
      var b2 = y2 + h2;
      var r2 = x2 + w2;

      if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
      return true;
    }
    
});