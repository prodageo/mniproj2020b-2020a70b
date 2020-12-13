import fs from 'fs'

export function readImages (dirname, onFileContent) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      console.error(err)
      return
    }
    filenames.forEach((filename) => {
      fs.readFile(dirname + filename, 'base64', (err, content) => {
        if (err) {
          console.error(err)
          return
        }
        onFileContent(filename, content)
      })
    })
  })
}

export function getImageInDB (randomnumber, db) {
  return new Promise((resolve, reject) => {
    db.collection('heroImg').findOne({ id: randomnumber }, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
