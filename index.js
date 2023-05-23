require("dotenv").config({
    path: "./.env"
})

const express = require("express")

const app = express()

app.get("/", (request, response)=>{
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})


const PORT = process.env.PORT
app.listen(PORT, ()=> {
    console.log(`App running on port ${PORT}`)
})
