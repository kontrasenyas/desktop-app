const electron = require('electron')
const { ipcRenderer: ipc } = electron

window.addEventListener('DOMContentLoaded', _ => {
  const sessionEl = document.getElementById('btnSession')

  sessionEl.addEventListener('click', _ => {
      ipc.send('start-session')
  })  

})