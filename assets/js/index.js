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
//changes game guidance text and makes start game button invisible
let begin = document.querySelector('#begin');
begin.addEventListener('click', function(){
    $('h2').text('Repeat After Simon!');
    $('#begin').hide();
    setTimeout(nextSequence, 2000);
});

//variables setup required for game start and reset
let numClick = -1;
let playerPattern = [];
let computerPattern = [];
let fourColors = ['red', 'blue', 'yellow', 'green'];
let level = 0;

//activates animation and audio when user clicks a button
//checks player pattern against simon's
$('.simon').click(function(buttonClicked){
    numClick++;
    let color = buttonClicked.target.id;
    simonAnimation('#' + color);
    playAudio(color);
    checkPlayer(color);
});

//activates user pattern check against computer
function checkPlayer(color){
    playerPattern.push(color);
    if(color == computerPattern[numClick]){
      if(playerPattern.length == computerPattern.length){
        setTimeout(function(){
          playerPattern = [];
          numClick = -1;
          nextSequence();
        }, 2000);
      }
    }else{
      $('h2').text('Wrong! Game Over');
      document.getElementById('begin').disabled = false;
      playerPattern = [];
      computerPattern = [];
      begin.addEventListener('click', function() {
        location.reload();
        }); 
     
      $('#begin').show();
      $('#begin').text('PLAY AGAIN');
    
      level = 0;
      numClick = -1;
    }
  }

//plays audio, animation after randomized colors are generated
function nextSequence(){
    level++;
    $('#level').text(level);
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
    audio.play()
}

//creates visual animation for clicked simon buttons
function simonAnimation(id){
    $(id).fadeOut(100).fadeIn(100);
}