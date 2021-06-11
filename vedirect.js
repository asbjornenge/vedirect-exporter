import serialport from 'serialport'
import Readline from '@serialport/parser-readline'

var bmvdata = {};

function get_product_longname(pid) {
    if (pid == "0x203") return("BMV-700");
    if (pid == "0x204") return("BMV-702");
    if (pid == "0x205") return("BMV-700H");
    if (pid == "0x300") return("MPPT 70/15");
    if (pid == "0xA042") return("MPPT 75/15");
    if (pid == "0xA043") return("MPPT 100/15");
    if (pid == "0xA044") return("MPPT 100/30");
    if (pid == "0xA041") return("MPPT 150/35");
    if (pid == "0xA040") return("MPPT 75/50");
    if (pid == "0xA045") return("MPPT 100/50");
    if (pid == "0xA065") return("MPPT 250/100");
    return ("Unknown");
}

function parse_serial(line) {
  var res = line.split("\t");
  //console.log(res)

  switch(res[0]) {
      case    'V':
        bmvdata.V = Math.floor(res[1]/10)/100;
        break;
      case    'VS':
        bmvdata.VS = Math.floor(res[1]/10)/100;
        break;
      case    'I':
        bmvdata.I = res[1];
        break;
      case    'SOC':
        bmvdata.SOC = res[1]/10;
        break;
      case    'CE':
        bmvdata.CE = res[1];
        break;
      case    'VPV':
        bmvdata.VPV = Math.floor(res[1]/10)/100;
        break;
      case    'PPV':
        bmvdata.PPV = res[1];
        break;
      case    'PID':
        bmvdata.PID = res[1];
        bmvdata.LONG = get_product_longname(res[1]);    
        break;
      case    'H20':
        bmvdata.YT = res[1];
        break;
      case    'H22':
        bmvdata.YY = res[1];
        break;
      case    'BMV':
        bmvdata.BMV = res[1];
        bmvdata.LONG = res[1];    
        break;
  }
}

export function connect(ve_port) {
  const port =  new serialport(ve_port, {
    baudRate: 19200,
  })
  const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
  parser.on('data', parse_serial)
}

export function read() {
  return bmvdata
}

export function close() {

}

