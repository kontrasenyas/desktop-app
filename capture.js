const electron = require('electron')
const images = require('./images')
const path = require('path')

const { desktopCapturer, ipcRenderer: ipc, screen } = electron

function onCapture(evt, targetDir) {
  getMainSource(desktopCapturer, screen, source => {
    const png = source.thumbnail.toPNG()
    const dataUrl = source.thumbnail.toDataURL('image/png')
    const date = GetFormattedDate()
    const filePath = path.join(targetDir, date + '.png')
    images.save(filePath, png)

    const photosEl = document.querySelector('.photosContainer')
    photosEl.appendChild(formatImgTag(document, dataUrl))
  })
}

function formatImgTag(doc, bytes) {
  const div = doc.createElement('div')
  div.classList.add('photo')
  const close = doc.createElement('div')
  close.classList.add('photoClose')
  const img = new Image()
  img.classList.add('photoImg')
  img.src = bytes
  div.appendChild(img)
  div.appendChild(close)
  return div
}

function getMainSource(desktopCapturer, screen, done) {
  const options = { types: ['screen'], thumbnailSize: screen.getPrimaryDisplay().workAreaSize }
  desktopCapturer.getSources(options, (err, sources) => {
    if (err) return console.log('Cannot capture screen:', err)

    const isMainSource = source => source.name === 'Entire screen' || source.name === 'Screen 1'
    done(sources.filter(isMainSource)[0])
  })
}

function GetFormattedDate() {
	var currentDt = new Date();
    var MM = currentDt.getMonth() + 1;
    var dd = currentDt.getDate();
    var yyyy = currentDt.getFullYear();
    var hh = currentDt.getHours();
    var mm = currentDt.getMinutes();
    var ss = currentDt.getSeconds()
    var date = MM  + '-' + dd + '-' + yyyy + '-' + hh + '-' + mm + '-' + ss ;

    return date;
}

ipc.on('capture', onCapture)
