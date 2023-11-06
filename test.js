const db_func = require("./model/db_handler/db_find")

//db_func.findUserById("654653a7c4b124d1889724b3", (d) => console.log(JSON.stringify(d)))

//db_func.findUserByUsernameAndPassword("naufal", "c374bc801db85ca06c52f25a63a0bd4d055074b929cf66d7cd5cd04f6585c44c", (d) => console.log(JSON.stringify(d)))

db_func.findNewPost("654653a7c4b124d1889724b3", (v) => console.log(v))