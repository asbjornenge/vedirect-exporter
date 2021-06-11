import Prometheus from 'prometheus-client'
import { connect, read } from './vedirect.js'

const NAMESPACE = 'vedirect'
const LOCATION = 'Fjellmynt1'
const prom = new Prometheus()

const metricBatteryVoltage = prom.newGauge({
    namespace: NAMESPACE, 
    name: "battery_voltage",
    help: "Battery voltage (V)"
})

const metricBatteryCurrent = prom.newGauge({
  namespace: NAMESPACE,
  name: "battery_current",
  help: "Battery current (mA)"
})

const metricPVVoltage = prom.newGauge({
  namespace: NAMESPACE,
  name: "pv_voltage",
  help: "PhotoVoltaic Voltage (V)"
})

const metricPVPower = prom.newGauge({
  namespace: NAMESPACE,
  name: "pv_power",
  help: "PhotoVoltaic Power (W)"
})

connect('/dev/ttyUSB0')

function updateMetrics() {
  let data = read()
  if (data.V) metricBatteryVoltage.set({ location: LOCATION }, data.V)
  if (data.I) metricBatteryCurrent.set({ location: LOCATION }, data.I)
  if (data.VPV) metricPVVoltage.set({ location: LOCATION }, data.VPV)
  if (data.PPV) metricPVPower.set({ location: LOCATION }, data.PPV)
  //console.log(data)
  setTimeout(updateMetrics, 5000)
}

updateMetrics()
prom.listen(9090)
