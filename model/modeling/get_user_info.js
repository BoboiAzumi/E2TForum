const { findUserById } = require("../db_handler/db_find");

async function get_user_info(id){
    let promise = new Promise((resolve) => {
        findUserById(id, (db) => {
            resolve(db)
        })
    })

    let res = await promise

    return res
}

module.exports = {
    get_user_info
}