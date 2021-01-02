
// const fs = jest.createMockFromModule('fs');
import { readImages, getImageInDB } from '../src/back/utils';
import mongodb from 'mongodb';
import fs from 'fs'

function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("testing functions described in utils.js", () => {
    const MongoClient = mongodb.MongoClient

    let connection;
    let db;

    beforeAll(async () => {
        connection = await MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true });
        db = await connection.db("myHeroImages");
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("check if collection heroImg exists", async () => {
        //doesnt exist
        var exists = false;
        expect(exists).toBeFalsy()

        db.listCollections({ name: 'heroImg' })
            .next(function (err, collinfo) {
                if (collinfo) {
                    exists = true
                }
            });
        await timeout(10);
        expect(exists).toBe(true);
    });

    it("readImages() reads the wrong folder should call console.error", async () => {
        const spy = jest.spyOn(console, 'error').mockImplementation();
        // readImages('./wrong-folder/', function () { });
        let count = 0
        readImages('./wrong-folder/', function (content) {
            expect(content).toBeDefined()
            count++
        })
        await timeout(50);
        expect(count).toEqual(0)
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenLastCalledWith("the folder ./wrong-folder/ does not exist");

    });

    it("readImages() should find and read all images in folder images", async () => {
        let count = 0
        readImages('./images/', function (content) {
            expect(content).toBeDefined()
            count++
        })
        await timeout(50);
        expect(count).toEqual(5)

    });

    it("getImageInDB() should find a doc by its id in collection heroImg", async () => {
        let imagefound = false
        const randomnumber = Math.floor(Math.random() * 5) + 1
        expect(imagefound).toBe(false);
        await getImageInDB(randomnumber, db)
            .then(() => {
                imagefound = true
            })
            .catch((error) => { console.error(error) })

        expect(imagefound).toBe(true);
    });

    it("getImageInDB() looks for an image that does not exist in mongo database", () => {
        const idnumber = 12370
        getImageInDB(idnumber, db).catch(e => expect(e).toMatch('imageid not found in db'));

    });
});