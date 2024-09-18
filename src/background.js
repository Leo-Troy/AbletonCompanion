'use strict'

import { app, protocol, BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const { autoUpdater, AppUpdater } = require("electron-updater")
const isDevelopment = process.env.NODE_ENV !== 'production'

require("@electron/remote/main").initialize()

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true
// autoUpdater.setFeedURL({
//     url: "https://MrLeoTroy:" + process.env.GH_TOKEN + "@github.com/MrLeoTroy/ableton-companion/releases/latest",
//     provider: 'github'
//   });

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1300,
    height: 900,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
      webSecurity: false,
      allowRunningInsecureContent: true
    }
  })
//   win.setIcon('./src/assets/icon.png');
  win.setMenu(null);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    win.webContents.openDevTools()
    if (!process.env.IS_TEST) win.webContents.openDevTools()
    autoUpdater.checkForUpdates()
        win.webContents.send("update-message", "Check for update")

        autoUpdater.on("update-available", (info) => {
        autoUpdater.downloadUpdate()
        win.webContents.send("update-message", "Update Available")
        })

        autoUpdater.on('error', (error) => {
            win.webContents.send("update-message", error)
          });

        
        autoUpdater.on('update-downloaded', () => {
            // Update downloaded; prompt user to install
            autoUpdater.quitAndInstall();
        });
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html').then(() => {

    autoUpdater.on('checking-for-update', () => {
        win.webContents.send("update-message", "Checking for update...");
      });
    
      autoUpdater.on('update-available', (info) => {
        win.webContents.send("update-message", "Update Available");
        autoUpdater.downloadUpdate();
      });
    
      autoUpdater.on('update-not-available', (info) => {
        win.webContents.send("update-message", "No updates available.");
      });
    
      autoUpdater.on('download-progress', (progressObj) => {
        const { percent } = progressObj;
        win.webContents.send("update-message", "Update " + percent + "%");
      });
    
      autoUpdater.on('update-downloaded', () => {
        win.webContents.send("update-message", "Update Downloaded. Installing...");
        autoUpdater.quitAndInstall();
      });
    
      autoUpdater.on('error', (error) => {
        win.webContents.send("update-message", error.message);
      });
    
      // Check for updates
      autoUpdater.checkForUpdates();

    })
  }

    win.on('close', (event) => {
        win.webContents.send('close');
    })




    
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
} 

