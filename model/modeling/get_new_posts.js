const { findNewPost } = require("../db_handler/db_find");
const { get_user_info } = require("./get_user_info");

async function get_new_post(userid){
    let promise = new Promise((resolve) => {
        findNewPost(userid, async (posts) => {
            for(let i = 0; i < posts.length; i++){
                let userinfo = await get_user_info(posts[i].userid.toString())
                posts[i].fullname = userinfo[0].fullname
                posts[i].avatar = userinfo[0].avatar
            }
            resolve(posts)
        })
    })

    let res = await promise

    res.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return c-d;
    });

    return res.reverse()
}

module.exports = {
    get_new_post
}