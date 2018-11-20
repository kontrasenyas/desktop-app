const path = require('path')
const fs = require('fs')

const logError = err => err && console.error(err)

exports.save = (filePath, png) => {
  fs.writeFile(filePath, png, err => {
    if (err) return console.log('Failed to write screen:', err)
  })
}

exports.getPictureDir = app => {
	return path.join(app.getAppPath(), 'screenshots')
}

exports.mkdir = picturesPath => {
	fs.stat(picturesPath, (err, stats) => {
		if (err && err.code !== 'ENOENT') {
			return logError(err)
		}
		else if (err || !stats.isDirectory())
			fs.mkdir(picturesPath, logError)
	})
}