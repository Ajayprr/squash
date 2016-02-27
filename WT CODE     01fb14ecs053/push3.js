var canvas  = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var ui =  document.getElementById("gameUI");
var uiIntro =  document.getElementById("gameIntro");
var uiStats =  document.getElementById("gameStats");
var uiComplete = document.getElementById("gameComplete");
var uiPlay =  document.getElementById("gamePlay");
var uiReset = $(".gameReset");
var uiRemaining = document.getElementById("gameRemaining");
var uiScore = $(".gameScore"); 
var canvasWidth = canvas.clientWidth;
var canvasHeight = canvas.clientHeight;
var ballX=canvasWidth/2;
var ballY=canvasHeight*0.9;
var ballR=10;
var ballVx=0;
var ballVy=0;
var blockIx = (canvasWidth/2)-50;
var blockIy = canvasHeight - 22;
var width = 100;
var height = 20 ;
var blockVx=0;
var blockVy=0;

var arrowLeft = 37;
var arrowUp = 38;
var arrowRight = 39;
var arrowDown = 40;
var moveLeft = false;
var moveRight = false;
var moveTop = false;
var moveDown = false;
var speedX=-1;
var speedY=-7;
var score=0;
var ft = true;
var dif = document.getElementById("dif");
function init()
{
	uiComplete.style.display="none";
	uiStats.style.display="none";
	uiPlay.onclick = function(e) {
		e.preventDefault();
		uiIntro.style.display="none";
		startGame();
		
		}
	uiReset.onclick = function(e) {
		e.preventDefault();
		uiComplete.style.display="none";
		$(window).unbind("keyup");
		$(window).unbind("keydown");		
		startGame();
		
		}
}

function startGame()
{
uiScore.innerHTML="0";
uiStats.style.display="inline";

LeftBorder  = canvasHeight*0.8;

RightBorder= canvasHeight*0.8;

TopBorder=canvasWidth;
	$(window).keydown(function(e) {
		var keyCode = e.keyCode;		
		if (keyCode == arrowRight) {
			moveRight = true;
		} else if (keyCode == arrowUp) {
			moveTop = true;
		} else if (keyCode == arrowDown) {
			moveDown = true;
		}
		else if (keyCode == arrowLeft) {
			moveLeft = true;
		};
		});

	$(window).keyup(function(e) {
		var keyCode = e.keyCode;
		if (keyCode == arrowRight) {
			moveRight = false;
		
		} else if (keyCode == arrowUp) {
			moveTop = false;
		} else if (keyCode == arrowDown) {
			moveDown = false;
		}
		 else if (keyCode == arrowLeft ) {
			moveLeft = false;
		};
	
	});
animate();

}

function animate()
{

	
	context.clearRect(0,0,canvas.width,canvas.height)
	
	context.beginPath();
	context.lineWidth=5
	context.strokeStyle="white";
	if(!dif.checked){
	context.moveTo(2,canvasHeight*0.1);
	context.lineTo(2,canvasHeight);
	context.closePath();
	}
	context.moveTo(2,canvasHeight*0.1);
	context.lineTo(canvasWidth-2,canvasHeight*0.1);
	context.closePath();
	context.moveTo(canvasWidth-2,canvasHeight*0.1);
	context.lineTo(canvasWidth-2,canvasHeight);
	context.closePath();
	context.moveTo(canvasWidth,canvasHeight*0.85);
	context.lineWidth=2;
	context.lineTo(2,canvasHeight*0.85);
	context.closePath();
	context.stroke();
	context.fillStyle="red";	
	context.rect(blockIx,blockIy,width,height);
	context.closePath();
	context.fill();
	
	context.fillStyle="white";
	context.arc(ballX,ballY,ballR,0,Math.PI*2);
	
	context.fill();
	context.closePath();
	

	if (moveRight) {
            if(blockIx+100 < canvasWidth )
		{
		blockIx += 5;
		}
		
	};
	if (moveTop) {
		if(blockIy > canvasHeight*0.85 )
		{
		blockIy += -5;
		}
		
	};
	if (moveDown) {
		if(blockIy+height < canvasHeight )
		{
		blockIy += 5;
		}
	};
	if (moveLeft) {
	if(blockIx > 0 )
		{
			blockIx += -5;
		}
	};
	
	
	
	
	if(ballY < (canvasHeight*0.13))
	{
	
		speedY = -speedY;
		
	}
	if(ballX < (0)+10 || ballX > (canvasWidth)-10 )
	{
		
		if(dif.checked && ballX < (0) + 10 ){
			ballX = canvasWidth -10;}
		else{
		speedX = -speedX;
		}
	}


	if(ballX >= blockIx && ballX <= blockIx+100  )
	{
		if(ballY >= blockIy-10 )
		{
			speedY = -speedY;
			
			uiScore.html(++score);
			if(score<0)
				{
					score=1;
				}
			if(ballX-blockIx > 50)
			{
				if(speedX>0)
				{
					
					speedX += (ballX-blockIx-50)/20;
				}
				else{
					
					speedX = -speedX;
					speedX += (ballX-blockIx-50)/20;
				}
			}
			else{
				if(speedX>0)
				{
					speedX = -speedX;
					speedX -= (50-(ballX-blockIx))/20;
				}
				else{
					speedX -= (50-(ballX-blockIx))/20;
				}
			}
			
			if(speedY <= 10)
			{
				if(ft)
				{
					speedY = -7;
					ft=false;
				}
				else
				speedY -= 1;
			}
			else{
				if(ft)
				{
					speedY = -7;
					ft=false;
				}
				speedY += 1;
			}
		}
		
	}
	ballY += speedY;
	ballX += speedX;
	
	if(ballY < canvasHeight+10)
	{
	setTimeout(animate,33);
	}
	else{
		context.clearRect(0,0,canvas.width,canvas.height);
		uiComplete.style.display = "inline";
	}	
}
               
init();
