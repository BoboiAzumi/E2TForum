const { ObjectId } = require("mongodb")
const { InsertToLike } = require("../db_handler/db_insert")
const { get_like_exist } = require("./get_like")

async function insert_like(userid, postid){
    let promise
    if(await get_like_exist(userid, postid)){
        return false
    }
    else{
        promise = new Promise(async (resolve) => {
            let object = {
                userid: new ObjectId(userid),
                to: new ObjectId(postid)
            }
            
            InsertToLike(object, (ret) => {
                resolve(ret)
            })
        })
    }
    

    let ret = await promise

    return ret
}

module.exports = {
    insert_like
}