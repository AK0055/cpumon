var si = require('systeminformation');
setInterval(()=>{
    
    si.osInfo(function(data) {
    console.log(data);
    });
    
    
    
    si.cpuTemperature(function(data) {
    console.log(data);
    });
    
    },1000);