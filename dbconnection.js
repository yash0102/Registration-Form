const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const connectDb = () =>{
   mongoose.connect('mongodb://127.0.0.1:27017/Registration_Form').then(()=>{
    console.log("Database connected")
   }).catch((err)=>{
    console.log(err)
   })
}

module.exports = connectDb