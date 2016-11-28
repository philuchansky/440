var keyboard = document.querySelector('#keyboard')
var keys = document.querySelectorAll('#keyboard .key button')

// event listeners for all keys:
keys.forEach(function(key) {
  key.addEventListener('mousedown', playSound)
  key.addEventListener('mouseup', stopSound)
})

function playSound() {
  console.log("Start playing!")
}

function stopSound() {
  console.log("Stop playing!")
}
