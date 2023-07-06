// Handle Async Errors
require("express-async-errors")
require("dotenv").config()

const express = require("express")
const connectDB = require("./db/connect")
const router = require("./routes/products")
const handleErrorMiddleWare = require("./middlewares/error-handler")
const notFound = require("./middlewares/not-found")
const app = express()
app.get("/", (req,res)=> {
    res.status(200).json({msg: "WALCOME TO HOME PAGE"})
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/v1/products", router)
app.use(handleErrorMiddleWare)
app.use(notFound)
const start = async () => {
    try {
        await connectDB(process.env.DATABASE_URL)
        app.listen(5000, ()=> {
            "Server is listening at port 5000"
        })
        console.log("Server is listening")
    } catch (error) {
        console.log(error)
    }
}
start()


