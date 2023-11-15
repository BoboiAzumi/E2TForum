const { ObjectId } = require("mongodb")
const { deleteLike } = require("../db_handler/db_delete")
const { get_like_exist } = require("./get_like")

async function delete_like(userid, postid){
    let promise
    if(!(await get_like_exist(userid, postid))){
        return false
    }
    else{
        promise = new Promise(async (resolve) => {
            let object = {
                userid: new ObjectId(userid),
                to: new ObjectId(postid)
            }
            
            deleteLike(object, (ret) => {
                resolve(ret)
            })
        })
    }

    let ret = await promise
    return ret
}

module.exports = {
    delete_like
}