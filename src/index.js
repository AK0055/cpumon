const { app, BrowserWindow } = require('electron');
const os = require('os-utils');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  setInterval(() => {
    os.cpuUsage(function(v){
      //console.log(os.freememPercentage()*100)
      cpuusage=v*100;
      mainWindow.webContents.send('cpu',v*100);
      //var elem = document.getElementById('percent');
      //mainWindow.getWebContents("percent").classList.toggle(`c100 p${v*100} blue`);

      //elem.style.color = newColor;
      mainWindow.webContents.send('mem',os.freememPercentage()*100);
      mainWindow.webContents.send('total-mem',os.totalmem()/1024);
    });
  },1000);
  window.onload = function() {

    var si = require('systeminformation');
    
    si.cpu(function(data) {
    console.log(data);
    });
    
    si.cpuCurrentspeed(function(data) {
    console.log(data);
    });
    
    si.cpuTemperature(function(data) {
    console.log(data);
    });
    
    }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
