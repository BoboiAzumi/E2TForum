const { findUsername } = require("../db_handler/db_find")

async function is_username_exist(username){
    let promise = new Promise((resolve) => {
        findUsername(username, (res) => {
            resolve(res)
        })
    })

    let res = await promise
    return res
}

module.exports = {
    is_username_exist
}