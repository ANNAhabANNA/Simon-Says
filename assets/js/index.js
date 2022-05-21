/*jshint esversion: 6 */
/*globals $:false */
//makes the intro html disappear on a click of 'CONTINUE' button
let start = document.querySelector('.disappear');
start.addEventListener('click', function(){
  let intro = document.querySelector('.intro');
  intro.style.top = '100%';
});

//creates a new h2 element for game guidence display 
const newHeading = document.createElement('h2');
document.getElementById('heading').appendChild(newHeading);

//creates click event listener to activate game after 2000msec delay
let begin = document.querySelector('#begin');
$(".container").css("pointer-events","none");
begin.addEventListener('click', function(){
  $(".container").css("pointer-events","auto");
  //changes game guidance text and makes start game button invisible
  $('h2').text('Repeat After Simon!');
  //accessibility
  document.querySelector('h2[aria-label="repeat after simon"]');
  $('#begin').hide();
  //pauses before moving to next level sequence
  setTimeout(nextSequence, 2000);
});

//variables setup required for game start and reset
let numClick = -1;
let playerPattern = [];
let computerPattern = [];
let fourColors = ['red', 'green', 'yellow', 'blue'];
let level = 0;

//activates animation and audio when user clicks a button
//checks player pattern against computer
$('.simon').click(function(buttonClicked){
  numClick++;
  //gets color id of clicked button
  let color = buttonClicked.target.id;
  //plays relevant color audio 
  simonAnimation('#' + color);
  playAudio(color);
  checkPlayer(color);
});

//the code from  https://www.youtube.com/watch?v=FEL8gKaIm1Y was used and customized according to the project needs
//activates user pattern check against computer's pattern
function checkPlayer(color){
  //user click added to playerPattern array
  playerPattern.push(color);
  //checks that user clicked color is the same as in computer array
  if(color == computerPattern[numClick]){
    //checks that user does not click more or less than 4
    if(playerPattern.length == computerPattern.length){
      //code execution pauses before next level round
      setTimeout(function(){
        playerPattern = [];
        numClick = -1;
        nextSequence();
      }, 2000);
    }
  }else{
    $(".container").css("pointer-events","none");
    $('h2').text('Wrong! Game Over!');
    //accesibility
    document.querySelector('h2[aria-label="wrong! game over!"]');
    //game resets
    playerPattern = [];
    computerPattern = [];
    level = 0;
    numClick = -1;
    //makes start game button visible again with changed text
    document.getElementById('begin').disabled = false;
    $('#begin').show();
    $('#begin').text('PLAY AGAIN');
    //accessibility
    let el = document.getElementById('begin');
    el.ariaLabel = "play again";
    //restarts the game and opens the intro page for fresh start
    begin.addEventListener('click', function() {
      location.reload();
    }); 
  }
}

//plays audio, animation after randomized colors are generated
function nextSequence(){
  //increases game level after successful round
  level++;
  //shows updated game level
  $('#level').text(level);
  //computer randomized color that is passed to computer array
  let randomColors = Math.floor(Math.random()*4);
  let color = fourColors[randomColors];
  computerPattern.push(color);
  playAudio(color);
  simonAnimation('#' + color);
}

//associates each of the possible colors with relevant audio file
function playAudio(color){
  let audioPath = `assets/audio/${color}.mp3`;
  let audio = new Audio(audioPath);
  audio.play();
}

//creates visual animation for clicked simon buttons
function simonAnimation(id){
  $(id).fadeOut(100).fadeIn(100);
}