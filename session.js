const electron = require('electron')
const { ipcRenderer: ipc } = electron

window.addEventListener('DOMContentLoaded', _ => {
  const recordEl = document.getElementById('btnSession')

  recordEl.addEventListener('click', _ => {
      ipc.send('start-session')
  })  

})