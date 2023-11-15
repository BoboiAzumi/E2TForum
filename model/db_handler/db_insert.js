const dbase = require("./db_connect")

function InsertToPost(object, callback){
    dbase.drive(async (db, client) => {
        try{
            const collection = db.collection("post")
            await collection.insertOne(object)
            callback(true)
        }
        catch{
            callback(false)
        }
        client.close()
    })
}

function InsertToLike(object, callback){
    dbase.drive(async (db, client) => {
        try{
            const collection = db.collection("like")
            await collection.insertOne(object)
            callback(true)
        }
        catch{
            callback(false)
        }

        client.close()
    })
}

module.exports ={
    InsertToPost,
    InsertToLike
}