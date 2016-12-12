var keyboard = document.querySelector('#keyboard')
var keys = document.querySelectorAll('#keyboard button.key')
var waveformSelect = document.querySelector('#waveform-select')
var release = document.querySelector('#release')



function release(time) {
  oscillator.stop(time);

  //
  console.log("Stop playing!")
}

// event listeners for all keys:
keys.forEach(function(key) {
  key.addEventListener('mousedown', function() {
    this.freq = Number(this.dataset.freq)
    new Note(this.freq)
  })

  // key.addEventListener('mouseup', function() {
  //   release(adsr.release())
  // })
})

function Note(freq) {
  // adsr:
  this.release = release.value / 20
  // this.release = 1



  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  var vca = audioCtx.createGain()
  vca.gain.value = 1
  vca.connect(audioCtx.destination)

  var waveform = waveformSelect.value

  var oscillator = audioCtx.createOscillator()
  oscillator.type = waveform
  oscillator.frequency.value = freq
  oscillator.connect(vca)
  oscillator.start()

  var releaseTime = (this.release)
  console.log("Release time:", releaseTime)
  var initialGain = vca.gain.value
  console.log("Initial Gain:", initialGain)

  var attenuationRate = (0.01 / (releaseTime))


  var fadeOut = setInterval(function() {
    vca.gain.value -= attenuationRate
  }, 10)

  oscillator.stop(releaseTime)

  setTimeout(function() {
    console.log("Ending Gain:", vca.gain.value)
    clearInterval(fadeOut)
    audioCtx.close()
  }, releaseTime * 1000)
  //
  console.log("Playing at", freq + "hz")
}
