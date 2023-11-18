const express = require("express")
const path = require("path")
const cookieparser = require("cookie-parser")
const session = require("express-session")
const crypto = require("crypto")
const {login} = require("./model/modeling/login")
const { findUserByUsernameAndPassword } = require("./model/db_handler/db_find")
const { get_user_info } = require("./model/modeling/get_user_info")
const { insert_post } = require("./model/modeling/insert_post")
const { get_new_post } = require("./model/modeling/get_new_posts")
const { insert_like } = require("./model/modeling/insert_like")
const { delete_like } = require("./model/modeling/delete_like")
const { get_like_num } = require("./model/modeling/get_like")
const app = express()

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())
app.use(session({
    secret: "ID-00998877-88776655-889988",
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))

function isNotLogin(req, res, next){
    if(req.session.userid === undefined){
        res.redirect("/login/")
    }
    else{
        next()
    }
}

function isLogin(req, res, next){
    if(req.session.userid){
        res.redirect("/")
    }
    else{
        next()
    }
}

app.get("/", isNotLogin, async (req, res) => {
    let info = await get_user_info(req.session.userid)
    res.render("pages/index", info[0])
})

app.get("/login/", isLogin, (req, res) => {
    res.render("pages/login.ejs");
})

app.post("/loginact/", isLogin, async (req, res) => {
    if(await login(req.body.username, req.body.password)){
        let hash = crypto.createHash("sha256")
        hash.update(req.body.password)
        hash = hash.digest("hex")

        let promise = new Promise((resolve) => {
            findUserByUsernameAndPassword(req.body.username, hash, (tb) => {
                let json = JSON.stringify(tb)
                let json_ = JSON.parse(json)
                resolve(json_)
            })
        })

        let json_ = await promise

        req.session.userid = json_[0]._id
        req.session.nama = req.body.username
        res.redirect("/")
    }
    else{
        res.redirect("/login/")
    }
})

app.get("/logout/", isNotLogin, (req, res) => {
    req.session.destroy()
    res.redirect("/login/")
})

app.post("/sendpost/", isNotLogin, async (req, res) => {
    let status = await insert_post(req.session.userid, req.body.post)

    if(status){
        res.end("{\"status\" : \"ok\"}")
    }
    else{
        res.end("{\"status\" : \"not ok\"}")
    }
})

app.get("/getnewposts/", isNotLogin, async (req, res) => {
    let posts = await get_new_post(req.session.userid)

    res.end(JSON.stringify(posts))
})

app.post("/insertlike/", isNotLogin, async (req, res) => {
    let userid = req.session.userid
    let postid = req.body.postid

    if(await insert_like(userid, postid)){
        let likenum = await get_like_num(postid)
        res.end("{\"status\" : \"ok\", \"likenum\":\""+likenum+"\"}")
    }
    else{
        res.end("{\"status\" : \"not ok\"}")
    }
    
})

app.post("/deletelike/", isNotLogin, async (req, res) => {
    let userid = req.session.userid
    let postid = req.body.postid

    if(await delete_like(userid, postid)){
        let likenum = await get_like_num(postid)
        res.end("{\"status\" : \"ok\", \"likenum\":\""+likenum+"\"}")
    }
    else{
        res.end("{\"status\" : \"not ok\"}")
    }
    
})

app.get("/signup/", isLogin, async(req, res) => {
    res.render("pages/signup.ejs");
})

app.post("/signupact/", async(req, res) => {
    res.end("on dev")
})

app.listen(1000, () => console.log("starting"))
