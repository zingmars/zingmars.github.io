$(document).ready(function () {
	startButtonCreate("Start game")
})

function startButtonCreate(message) 
{	
	$(".game").append("<button onclick=\"gameStart()\">"+message+"</button>")
}
function gameStart() 
{
	//Change settings here to start the game
	var gridsize = parseInt($("#gridsize").val()) || 6 // x*x
	var field = $(".game")
	var levels = parseInt($("#levels").val()) || 10
	var difficulty = 100 - (parseInt($("#difficulty").val()) || 80)//The smaller the number, the harder it is. Anything < 10 is near impossible imho.
	console.log(difficulty)
	fieldGenerate(gridsize, field, difficulty, levels)		
}
function gameOver(victory = false)
{
	//Game over message	
	$(".game").html("")
	if(!victory) {
		$(".game").append("<h2> You lost </h2>")		
	} else {
		$(".game").append("<h2> Congratz! You won! </h2>")		
	}
	startButtonCreate("Try again?")
}
function fieldGenerate(size, field, difficulty, levels) 
{
	field.html("")

	// Generate a colour
	var R = Math.floor((Math.random()*256)+1)
	var G = Math.floor((Math.random()*256)+1)
	var B = Math.floor((Math.random()*256)+1)

	// Select one random element as the one we want
	var randomX = Math.floor((Math.random()*size))
	var randomY = Math.floor((Math.random()*size))	
	console.log("Debug: ["+ parseInt(randomX+1) + ":" + parseInt(randomY+1) + "]")

	// Calculate the difficulty the next round will have. Feel free to adjust this to your needs.
	var newDifficulty = (levels-1)%difficulty == 0 ? difficulty - 5 : difficulty

	//col
	for (var i = 0; i < size; i++) {
		//row
		field.append("<div class=\"row-divider\">")
		for (var j = 0; j < size; j++) {	
			//Apply random colouring
			var tmpR = R
			var tmpG = G
			var tmpB = B			
			var operation = Math.floor(Math.random()*2) // 0 - subtract, 1 - add						

			// Pick the colour with the highest value and accent it just a bit. In most cases this works just fine.
			if(i == randomY && j == randomX ) {	
				switch(Math.max(R, G, B)) {
					case R: {
						tmpR = operation == 0 ? Math.abs(R - difficulty) : Math.min(R + difficulty, 255)
						break;
					}
					case G: {
						tmpG = operation == 0 ? Math.abs(G - difficulty) : Math.min(G + difficulty, 255)
						break;
					}
					case B: {
						tmpB = operation == 0 ? Math.abs(B - difficulty) : Math.min(B + difficulty, 255)
						break;
					}
				}
			}
					

			//Draw box
			field.append("<div class=\"color-box\" style=\"background-color: rgb("+ tmpR +","+ tmpG +","+ tmpB +")\"></div>")						

			//Add click handlers
			if(i == randomY && j == randomX) {
				$(".color-box:last").on("click", function () {					
					if(levels == 1) { 
						gameOver(true)										
					} else {						
						fieldGenerate(size, field, newDifficulty, levels - 1)																	
					}
				})
			} else {
				$(".color-box:last").on("click", function () {										
					gameOver()				
				})	
			}
			
		}		
	}
	field.append("<div class=\"row-divider\">")
	startButtonCreate("Restart game")
}