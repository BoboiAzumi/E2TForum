const db_find = require("../db_handler/db_find")
const crypto = require("crypto")

async function login(username, password){
    let hash = crypto.createHash("sha256")
    hash.update(password)
    hash = hash.digest("hex")

    let promise = new Promise((resolve) => {
        db_find.findUserByUsernameAndPassword(username, hash, (user) => {
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