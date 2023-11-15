const dbase = require("./db_connect")

function deleteLike(object, callback){
    dbase.drive(async (db, client) => {
        let collection = db.collection("like")
        try{
            await collection.deleteOne(object)
            callback(true)
        }
        catch{
            callback(false)
        }
        client.close()
    })
}

module.exports = {
    deleteLike
}