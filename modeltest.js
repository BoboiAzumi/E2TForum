const { get_new_post } = require("./model/modeling/get_new_posts")
const { is_username_exist } = require("./model/modeling/is_username_exist")
const model = require("./model/modeling/login")

//model.login("naufa", "azmi")
async function username(){
    const is = await is_username_exist("nauf")
    console.log(is)
}

username()
 

//get_new_post("654653a7c4b124d1889724b3")
