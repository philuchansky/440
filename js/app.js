var keyboard = document.querySelector('#keyboard')
var keys = document.querySelectorAll('#keyboard button.key')
var oscillator = null

// create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
var vca = audioCtx.createGain()
vca.gain.value = 0.3
vca.connect(audioCtx.destination)

function attack(freq) {
  oscillator = audioCtx.createOscillator()
  oscillator.type = oscillator.SAWTOOTH
  oscillator.frequency.value = freq
  oscillator.connect(vca)
  oscillator.start()

  //
  console.log("Playing at", freq + "hz")
}

function release() {
  oscillator.stop();

  //
  console.log("Stop playing!")
}

// event listeners for all keys:
keys.forEach(function(key) {
  key.addEventListener('mousedown', function() {
    this.freq = Number(this.dataset.freq)
    attack(this.freq)
  })
  key.addEventListener('mouseup', release)
})
