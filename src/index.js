// require('dotenv').config({path:'./env'})  //we have to pass the path of .env file
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path:'./env'
})

connectDB()
















/*
import express from 'express'

const app=express()

(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(err)=>{
            console.log(err)
            throw err
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port `)
        })
    } catch (error) {
        console.log(error)
    }
})()

*/