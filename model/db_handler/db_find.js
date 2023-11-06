const { ObjectId } = require("mongodb")
const dbase = require("./db_connect")

function findUserById(id, callback){
    dbase.drive(async (db, client) => {
        const collection = await db.collection("user")
        let user = await collection.find({_id : new ObjectId(id)}).toArray()
        callback(user)

        client.close()
    })
}

function findUserByUsernameAndPassword(username, password, callback){
    dbase.drive(async (db, client) => {
        const collection = await db.collection("user")
        let user = await collection.find({username : username, password : password}).toArray()

        callback(user)
        client.close()
    })
}

function findNewPost(userid, callback){
    dbase.drive(async (db, client) => {
        let kemarin = new Date()
        kemarin.setDate(kemarin.getDate() - 1)
        const collection_post = await db.collection("post")
        const collection_following = await db.collection("following")

        const following = await collection_following.find({from: new ObjectId(userid)}).toArray()

        let posts = []

        if(following.length > 0){
            for(let i = 0; i < following.length; i++){
                let post = await collection_post.find({
                                userid: following[0].to, 
                                date : {
                                    $gte : kemarin
                                }
                            }).toArray()
                
                for(let j = 0; j < post.length; j++){
                    posts.push(post[j])
                }

                let post_from_me = await collection_post.find({
                                        userid: new ObjectId(userid), 
                                        date : {
                                            $gte : kemarin
                                        }
                                    }).toArray()

                for(let j = 0; j < post_from_me.length; j++){
                    posts.push(post_from_me[j])
                }
            }
        }
        else{
            let post_from_me = await collection_post.find({
                userid: new ObjectId(userid), 
                date : {
                    $gte : kemarin
                }
            }).toArray()

            for(let j = 0; j < post_from_me.length; j++){
                posts.push(post_from_me[j])
            }
        }
        client.close()
        callback(posts)
    })
}

module.exports = {
    findUserById,
    findUserByUsernameAndPassword,
    findNewPost
};