
//makes the intro html disappear on a click of 'CONTINUE' button
let start = document.querySelector('.disappear');
start.addEventListener('click', function(){
  let intro = document.querySelector('.intro');
  intro.style.top = '100%';
});