 confetti(){

  var duration = 1 * 100;
  var end = Date.now() + duration;
 
(function frame() {
  // launch a few confetti from the left edge
  confetti({
    particleCount: 3,
    angle: 60,
    spread: 180,
    origin: { x: 0 }
  });
  // and launch a few from the right edge
  confetti({
    particleCount: 3,
    angle: 120,
    spread: 180,
    origin: { x: 1 }
  });
 
  // keep going until we are out of time
  if (Date.now() < end) {
    requestAnimationFrame(frame);
  }
}());


 }




 