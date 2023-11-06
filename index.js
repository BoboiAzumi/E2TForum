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
        maxAge: 60 * 60 * 24 * 7
    }
}))

app.use((req, res, next) => {
    if(req.session.userid === undefined && req.url != "/login/" && req.url != "/loginact/"){
        res.redirect("/login/")
    }
    else{
        next()
    }
})

app.use((req, res, next) => {
    if(req.session.userid && (req.url === "/login/" || req.url === "/loginact/")){
        res.redirect("/")
    }
    else{
        next()
    }
})

app.get("/", async (req, res) => {
    let info = await get_user_info(req.session.userid)
    res.render("pages/index", info[0])
})

app.get("/login/", (req, res) => {
    res.render("pages/login.ejs");
})

app.post("/loginact/", async (req, res) => {
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

app.get("/logout/", (req, res) => {
    req.session.destroy()
    res.redirect("/login/")
})

app.post("/sendpost/", async (req, res) => {
    let status = await insert_post(req.session.userid, req.body.post)

    if(status){
        res.end("{\"status\" : \"ok\"}")
    }
    else{
        res.end("{\"status\" : \"not ok\"}")
    }
})

app.get("/getnewposts/", async (req, res) => {
    let posts = await get_new_post(req.session.userid)

    res.end(JSON.stringify(posts))
})

app.listen(1000, () => console.log("starting"))