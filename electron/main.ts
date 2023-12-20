import { app, BrowserWindow, ipcMain } from 'electron';
import electronSquirrelStartup from 'electron-squirrel-startup';
import path from 'path';
//import { SerialPort } from 'serialport';
const { SerialPort } = require('serialport');

if (electronSquirrelStartup) app.quit();

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

const preload = path.join(__dirname, 'preload.js')
const distPath = path.join(__dirname, '../.output/public')

let mainWindow: BrowserWindow;

const createWindow = (() => {  
  
  mainWindow = new BrowserWindow({
    backgroundColor: 'white',
    center: true,
    show: false,
    hasShadow: true,
    closable: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      nodeIntegrationInWorker: false,            
      webSecurity: true,
      sandbox: true,
      experimentalFeatures: false,
      preload
    },
  }); 
  
  if (app.isPackaged) {
    mainWindow.loadFile(path.join(distPath, 'index.html'))
  }
  else {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL!)  
  }
  
  mainWindow.show();
});

app.whenReady().then(() => {

  ipcMain.handle('listSerialPorts', listSerialPorts);

  createWindow();

  mainWindow.on('close', function() {

  });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
      app.quit();
  }
});

async function listSerialPorts() {
  return await SerialPort.list();
}