const { ObjectId } = require("mongodb")
const { InsertToPost } = require("../db_handler/db_insert")

async function insert_post(userid, post){
    let promise = new Promise((resolve) => {
        InsertToPost({userid:new ObjectId(userid), post: post, date: new Date()}, (res) => {
            resolve(res)
        })
    })

    let res = await promise

    return res
}

module.exports = {
    insert_post
}