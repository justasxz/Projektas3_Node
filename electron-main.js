const { app, BrowserWindow, dialog } = require('electron');

let mainWindow;
let httpServer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startServer() {
  // Serveris paleidžiamas tame pačiame procese (require), o ne atskiru 'node' procesu:
  // supakuotame .exe server.js guli app.asar viduje, o paprastas sistemos node.exe
  // negali skaityti failų iš asar archyvo, tad spawn('node', ...) visada nepavyktų.
  httpServer = require('./server.js');

  httpServer.once('listening', () => {
    const { port } = httpServer.address();
    mainWindow.loadURL(`http://localhost:${port}`);
  });

  httpServer.once('error', (error) => {
    dialog.showErrorBox('Serverio klaida', `Nepavyko paleisti serverio: ${error.message}`);
  });
}

app.on('ready', () => {
  createWindow();
  startServer();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
