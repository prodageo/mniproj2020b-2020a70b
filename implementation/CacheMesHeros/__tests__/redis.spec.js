import redis from 'redis-mock';
import { getImageInDB } from '../src/back/utils';
import mongodb from 'mongodb';

describe("testing cache using redis-mock", () => {
    const randomnumber = Math.floor(Math.random() * 5) + 1
    const MongoClient = mongodb.MongoClient
    let connection;
    let db;

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    beforeAll(async () => {
        connection = await MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true });
        db = await connection.db("myHeroImages");
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it("should create an instance of RedisClient which inherits from EventEmitter", () => {

        var r = redis.createClient();
        expect(r).toBeDefined();
        expect(r).toBeInstanceOf(redis.RedisClient);
        r.end(true);
    });

    it("check redisclient connection", async () => {

        var r = redis.createClient();
        var isready = false;
        var isconnected = false
        expect(isconnected).toBe(false);
        expect(isready).toBe(false);

        r.on("ready", function () {
            isready = true;
        });
        r.on("connect", function () {
            isconnected = true;
        });

        await timeout(50);
        expect(isconnected).toBe(true);
        expect(isready).toBe(true);
        r.end(true);

    });

    it("Check  if image is found in cache redis", async () => {
        var redisclient = redis.createClient();
        let imageFound = false;
        expect(imageFound).toBe(false);

        redisclient.keys('*', function (err, keys) {
            expect(keys.length).toEqual(0)

        });
        redisclient.setnx("1", "toto")
        redisclient.setnx("2", "toto2")
        redisclient.setnx("3", "toto3")
        redisclient.setnx("4", "toto4")
        redisclient.setnx("5", "toto5")

        redisclient.keys('*', function (err, keys) {
            expect(keys.length).toEqual(5)

        });

        redisclient.get(randomnumber.toString(), async (err, image) => {
            if (image) {
                imageFound = true;
            } else {
                await getImageInDB(randomnumber, db)
                    .then((result) => {
                        imageObtenue = result
                    })
                    .catch((error) => { console.error(error) })

                // On l'ajoute au cache
                redisClient.setnx(randomnumber.toString(), imageObtenue.data)

            }
        });
        await timeout(50);
        expect(imageFound).toBe(true);
        redisclient.end(true);
    })


});