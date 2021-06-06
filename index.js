import { connect, read } from './vedirect.js'

connect('/dev/ttyUSB0')

function updateMetrics() {
  console.log(read())
  setTimeout(updateMetrics, 5000)
}

updateMetrics()
