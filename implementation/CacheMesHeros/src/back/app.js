
import { readImages, getImageInDB } from './utils.js'
import express from 'express'
import http from 'http'
import mongodb from 'mongodb'
import { Server } from 'socket.io'
import redis from 'redis'

const MongoClient = mongodb.MongoClient

const url = 'mongodb://localhost:27017'
const dbName = 'myHeroImages'

const app = express()
const httpServer = http.createServer(app)
const redisPort = 6379
const redisClient = redis.createClient(redisPort)
const port = 3000
let db
let imageObtenue

app.use('/api/cachemesheros', express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

httpServer.listen(port, () => {
  console.log('listening on *:' + port + '\n')
})

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  db = client.db(dbName)
  let count = 1
  console.log('Connecté à MongoDB ' + db.databaseName + ' database')

  // On regarde si la collection heroImg existe déjà
  db.listCollections({ name: 'heroImg' })
    .next((err, collinfo) => {
      if (err) throw err
      // Si ce n'est pas le cas on la crée et la remplit des 5 images du dossier images
      if (!collinfo) {
        db.createCollection('heroImg', (err, result) => {
          if (err) throw err
          console.log('Collection is created ! ')
        })

        readImages('./images/', function (content) {
          db.collection('heroImg').insertOne({ id: count, data: content }, (err, res) => {
            if (err) { throw err }
            console.log('1 image inserted')
          })
          count++
        })
      }
    })
  // client.close() ça je sais pas où le mettre
})

redisClient.on('error', (err) => {
  console.error(err)
})

const io = new Server(httpServer)

io.on('connect', (client) => {
  console.log('Client connecté')

  client.on('chercherImg', async () => {
    // On choisit un ID au hasard compris entre 1 et 5
    const randomnumber = Math.floor(Math.random() * 5) + 1

    // On cherche l'image correspondant à l'ID dans le cache
    redisClient.get(randomnumber.toString(), async (err, image) => {
      if (err) throw err

      // Si on trouve l'image on la renvoit et on l'affiche
      if (image) {
        client.emit('afficherImg', {
          img: image
        })
      } else {
        // On cherche l'image dans la BD
        await getImageInDB(randomnumber, db)
          .then((result) => {
            imageObtenue = result
          })
          .catch((error) => { console.error(error) })

        // On l'ajoute au cache
        redisClient.setnx(randomnumber.toString(), imageObtenue.data)

        // On renvoit l'image au client et on l'affiche
        client.emit('afficherImg', {
          img: imageObtenue.data
        })
      }
    })
  })
})
