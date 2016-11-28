var keyboard = document.querySelector('#keyboard')
var keys = document.querySelectorAll('#keyboard .key button')
var oscillator = null


// event listeners for all keys:
keys.forEach(function(key) {
  key.addEventListener('mousedown', playSound)
  key.addEventListener('mouseup', stopSound)
})

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var vca = audioCtx.createGain()
vca.gain.value = 1
vca.connect(audioCtx.destination)

function playSound() {
  console.log("Start playing!")
  // create Oscillator node
  oscillator = audioCtx.createOscillator();
  oscillator.type = oscillator.SINE;
  oscillator.frequency.value = 220; // value in hertz
  oscillator.connect(vca)
  oscillator.start();

}

function stopSound() {
  console.log("Stop playing!")
  oscillator.stop();
}
