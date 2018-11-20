const {app, BrowserWindow, globalShortcut, ipcMain: ipc, Menu} = require('electron')

const images = require('./images')
const mysql = require('./connection')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 400})

  const name = app.getName()

  const template = [
    {
      label: 'File',
      submenu: [{
        label: `About ${name}`,
        click: _ => {
          console.log('click about')
        }
      }, {
        type: 'separator'
      }, {
        label: 'Quit',
        click: _ => { app.quit() },
        accelarator: 'Alt+Q'
      }]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.openDevTools()

  mysql.connect()

  globalShortcut.register('Ctrl+Alt+D', _ => {
    images.mkdir(images.getPictureDir(app))
    mainWindow.webContents.send('capture', images.getPictureDir(app))
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('start-session', (evt) => {
  images.mkdir(images.getPictureDir(app))
  mainWindow.webContents.send('capture', images.getPictureDir(app))
})
