
import Oscilloscope from 'oscilloscope'
import { useEffect } from "react"


const PianoDisplay = (props) => {
//   const { audioElement } = props

//   console.log('audioElement', audioElement)

// var audioContext = new window.AudioContext()

// create source from html5 audio element
// var source = audioContext.createMediaElementSource(audioElement)

// attach oscilloscope
// var scope = new Oscilloscope(source)

// start default animation loop
// scope.animate(canvas.getContext("2d"))



useEffect(() => {
  // get all audio nodes
  // const audioNodes = document.getElementsByTagName('audio')
  // console.log('audioNodes', audioNodes)
  
  const audioContext = window.TONE_AUDIO_CONTEXT.getContext()

  console.log('window', window.TONE_AUDIO_CONTEXT.destination.output)
  debugger
  console.log('typeof window.TONE_AUDIO_CONTEXT.destination', typeof window.TONE_AUDIO_CONTEXT.destination.output)
   // setup canvas
   const canvas = document.createElement('canvas')
   canvas.width = window.innerWidth
   canvas.height = window.innerHeight
   document.body.appendChild(canvas)

  // setup audio element
  // const audioElement = document.createElement('audio')
  // audioElement.controls = true
  // audioElement.autoplay = true
  // audioElement.loop = true
  // audioElement.src = 'assets/simple_drum.mp3'
  //adding to DOM
  // document.body.appendChild(audioElement)

  // create source from html5 audio element
  const source = audioContext.createMediaElementSource(audioElement)
  // console.log('audioContext', audioContext)

  // attach oscilloscope
  const scope = new Oscilloscope(source)

  // reconnect audio output to speakers
  source.connect(audioContext.destination)

  // customize drawing options
  const ctx = canvas.getContext('2d')
  ctx.lineWidth = 5
  ctx.strokeStyle = '#ffffff'

  // start default animation loop
  scope.animate(ctx)

  return () => {
    document.body.removeChild(audioElement)
  }
}, [])

  return (
  <>
  Oscillascope
  </>)
}

export default PianoDisplay