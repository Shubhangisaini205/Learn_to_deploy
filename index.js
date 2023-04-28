const express = require("express")
const cors=require("cors")
const { connection } = require("./db")
const { UserRouter } = require("./routes/User.routes")
const {noteRouter}= require("./routes/Note.routes")
const {auth} = require("./middleware/auth.middleware")
require("dotenv").config()
const app = express();
app.use(cors())
app.use(express.json())

app.use("/users", UserRouter)



app.get("/", (req, res) => {
    res.send("Home Page")
})

// should protected
app.use(auth)
app.use("/notes", noteRouter)




app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("Connected to the DB")
    } catch (error) {
        console.log(err);
        console.log("can not connect to the Db")
    }
    console.log("server is runnning at port 8080")
})