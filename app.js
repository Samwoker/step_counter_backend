
const express = require("express")
const cookieParser = require("cookie-parser")
const connectDb = require("./src/config/db")
const authRouter = require("./src/routes/auth")


const app = express()
PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)

connectDb().then(()=>{
    console.log("Database connection established")
    app.listen(PORT,()=>console.log(`App running on port ${PORT}`))

}).catch(()=>{
    console.log("Db connection error")
})
