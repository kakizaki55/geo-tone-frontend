
import Oscilloscope from 'oscilloscope'


const PianoDisplay = (props) => {
  const { audioElement } = props

  console.log('audioElement', audioElement)

var audioContext = new window.AudioContext()

// create source from html5 audio element
// var source = audioContext.createMediaElementSource(audioElement)

// attach oscilloscope
// var scope = new Oscilloscope(source)

// start default animation loop
// scope.animate(canvas.getContext("2d"))

  return (
  <>
  Oscillascope
  </>)
}

export default PianoDisplay