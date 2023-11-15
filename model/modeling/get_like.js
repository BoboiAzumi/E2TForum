const { findLikeFromWho, findLikeExist } = require("../db_handler/db_find")

async function get_like_num(postid){
    let promise = new Promise((resolve) => {
        findLikeFromWho(postid, (ret) => {
            resolve(ret.length)
        })
    })

    let ret = await promise
    return ret
}

async function get_like_exist(userid, postid){
    let promise = new Promise((resolve) => {
        findLikeExist(userid, postid, (ret) => {
            resolve(ret)
        })
    })

    let ret = await promise

    return ret
}

module.exports = {
    get_like_num,
    get_like_exist
}