import fs from 'fs'

export function readImages(dirname, onFileContent) {
  fs.readdir(dirname, (err, filenames) => {
    if (err) {
      console.error("the folder " + dirname + " does not exist")
      return
    }
    filenames.forEach((filename) => {
      fs.readFile(dirname + filename, 'base64', (err, content) => {
        onFileContent(content)
      })
    })
  })
}

export function getImageInDB(randomnumber, db) {
  return new Promise((resolve, reject) => {
    db.collection('heroImg').findOne({ id: randomnumber }, (err, result) => {
      if (err) {
        reject("imageid not found in db")
      } else {
        resolve(result)
      }
    })
  })
}

