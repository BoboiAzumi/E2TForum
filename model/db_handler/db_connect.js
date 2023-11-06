const {MongoClient} = require("mongodb");
require("dotenv").config()

const dbase = process.env.db
const host = process.env.host
const port = process.env.port
const url = "mongodb://"+host+":"+port+"/"

const Mongo = new MongoClient(url)

async function drive(callback){
    await Mongo.connect()

    const db = Mongo.db(dbase)

    callback(db, Mongo)
}

module.exports = {drive}