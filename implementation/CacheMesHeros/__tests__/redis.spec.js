import redismock from 'redis';
import { getImageInDB } from '../src/back/utils';
import mongodb from 'mongodb'
// var redismock = require('redis');

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

        // should.exist(redismock.createClient);
        var r = redismock.createClient();
        expect(r).toBeDefined();
        expect(r).toBeInstanceOf(redismock.RedisClient);
        // expect(r).toBeInstanceOf(events.EventEmitter);
        r.end(true);
    });

    it("check redisclient connection", async () => {

        var r = redismock.createClient();
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
        var r = redismock.createClient();
        let imageFound = false;
        expect(imageFound).toBe(false);
        r.get(randomnumber.toString(), async (err, image) => {
            if (image) {
                imageFound = true;
            }
        });
        await timeout(50);
        expect(imageFound).toBe(true);
        r.end(true);
    })
});