const crypto = require("crypto")
const { findUserByUsernameAndPassword } = require("../db_handler/db_find")

async function login(username, password){
    let hash = crypto.createHash("sha256")
    hash.update(password)
    hash = hash.digest("hex")

    let promise = new Promise((resolve) => {
        findUserByUsernameAndPassword(username, hash, (user) => {
            if(user.length > 0){
                resolve(true)
            }
            else{
                resolve(false)
            }
        })
    })

    let loginact = await promise

    return loginact
}

module.exports = {login}