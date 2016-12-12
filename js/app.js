var keyboard = document.querySelector('#keyboard')
var keys = document.querySelectorAll('#keyboard button.key')
var waveformSelect = document.querySelector('#waveform-select')
var attack = document.querySelector('#attack')
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
  this.attack = attack.value / 20
  this.release = release.value / 20



  var audioCtx = new (window.AudioContext || window.webkitAudioContext)()

  var vca = audioCtx.createGain()
  vca.gain.value = 0
  vca.connect(audioCtx.destination)

  var oscillator = audioCtx.createOscillator()
  oscillator.type = waveformSelect.value
  oscillator.frequency.value = freq
  oscillator.connect(vca)
  oscillator.start()

  var attackTime = (this.attack)
  console.log(attackTime)
  var releaseTime = (this.release)
  var initialGain = vca.gain.value
  var boostRate = (0.01 / (attackTime))
  var attenuationRate = (0.01 / (releaseTime))

  function fadeIn() {
    var fadeInInterval = setInterval(function() {
      vca.gain.value += boostRate
    }, 10)

    setTimeout(function() {
      clearInterval(fadeInInterval)
      fadeOut()
    }, attackTime * 1000)
  }

  fadeIn()

  function fadeOut() {
    var fadeOutInterval = setInterval(function() {
      vca.gain.value -= attenuationRate
    }, 10)

    oscillator.stop(releaseTime)

    setTimeout(function() {
      console.log("Ending Gain:", vca.gain.value)
      clearInterval(fadeOutInterval)
      audioCtx.close()
    }, releaseTime * 1000)
  }

  // fadeOut()

  //
  console.log("Playing at", freq + "hz")
}
