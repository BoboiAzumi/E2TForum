const { InsertToUser } = require("../db_handler/db_insert");
const { is_username_exist } = require("./is_username_exist");
const crypto = require("crypto")

async function signup(object){
    if(await is_username_exist(object.username)){
        return false
    }
    else{
        let hash = crypto.createHash("sha256")
        hash.update(object.password)
        let password = hash.digest("hex")

        let obj = {
            username: object.username,
            password: password,
            fullname: object.fullname,
            gender: object.gender,
            job: object.job,
            avatar: "newuser.png"
        }

        let promise = new Promise((resolve) => {
            InsertToUser(obj, (res) => {
                resolve(res)
            })
        })

        let res = await promise

        return res
    }
}

module.exports = {
    signup
}