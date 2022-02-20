
var si = require('systeminformation');
var ip = require('ip');
var sysInfo = {temp:0};

function updateSi() { 
        si.cpuTemperature(function(data) {
          sysInfo.temp = data.max;
          console.log(sysInfo.temp);
    });
  
  }

