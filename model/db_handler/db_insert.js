const dbase = require("./db_connect")

function InsertToPost(object, callback){
    dbase.drive(async (db) => {
        try{
            const collection = db.collection("post")
            await collection.insertOne(object)
            callback(true)
        }
        catch{
            callback(false)
        }
    })
}

module.exports ={
    InsertToPost
}