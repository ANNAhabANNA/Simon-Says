
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
    $('h2').text('Repeat Now!');
    $('#begin').hide();
    setTimeout(nextSequence, 2000);
});