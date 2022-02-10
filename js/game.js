//Arrays
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

//keep track of level
var level = 0;

//keep track of whether if the game has started or not
var started = false;

//Detect when a keyboard key has been pressed, and then call nextSequence()
$(document).on("keydown", function(event){

  //if game hasn't started yet
  if(started === false){
    //change h1's title to "Level 0"
    $("h1").text("Level " + level);

    //call nextSequence() only for the first time the key was pressed
    nextSequence();
    started = true;
  }

});


//Detect when any button is clicked
//Store user chosen colors
$(".btn").on("click", function(){

  //store id of button that got clicked
  var userChosenColour = $(this).attr("id"); //"this" keyword refers to the button got clicked

  //add the contents of the variable userChosenColour
  userClickedPattern.push(userChosenColour);

  //call animatePress() to animate the user clicks
  animatePress(userChosenColour);

  //call playSound() to play the sounds of button user pressed
  playSound(userChosenColour);

  //call checkAnswer()
  //passing in the index of the last answer
  checkAnswer(userClickedPattern.length - 1);

});


//Assign randomly created number to pick the color
function nextSequence(){

  //Empty array of userClickedPattern to be ready for the next level.
  userClickedPattern = [];

  //increase level
   level++;

   //update h1
   $("h1").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  //Animate to flush the button
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


  //call playSound() to play the sounds of buttons users should press
  playSound(randomChosenColour);

}


//Add sounds to buttons
function playSound(colorName){

  //play the sound
  var audio = new Audio("sounds/" + colorName + ".mp3");
  audio.play();
}


//Add animation to user clicks
function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  //remove the pressed class after a 100 milliseconds
  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


//8 Check the user's answer agaist the game
function checkAnswer(currentLevel){

  //check if user's most recent answer is same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("Success");

    //check if finished their sequence
    if(gamePattern.length === userClickedPattern.length){

      //call nextSequence() with delay 1 sec
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }

  }

  //if not the same
  else{
    console.log("Wrong");

    //play the wrong sound effect
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();

    //apply game-over css styles
    $("body").addClass("game-over");

    //remove the css after 200 milliseconds
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);

    //Change the h1 title
    $("h1").text("Game Over, Press Any Key to Restart");

    //call startOver() to restart the game
    startOver();

  }

}


//Restart the Game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
