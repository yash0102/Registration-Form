const express = require('express')
const path = require('path')
const app = express()
const connectDb = require("./dbconnection.js")
const port = process.env.PORT || 4000
const User = require("./models/userModel.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;
//database connection
connectDb()

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post("/register",async(req,res)=>{
    const {username,email,password,cpassword} = req.body
    if(!username || !email || !password || !cpassword){
        return res.status(400).send({"message":"All fields are required"})
    }else {
        const isExist = await User.findOne({email})
        if(isExist){
            return res.status(400).send({"message":"Email already exist"})
        }
        try {
            if (password !== cpassword) {
                res.status(400).send({"message": "Password does not match"});
            } else {
                const hashedPassword = await bcrypt.hash(password, saltRounds);
                const user = new User({
                    name: username,
                    email,
                    password: hashedPassword,
                    cpassword: hashedPassword // You might not need to store cpassword
                });
                await user.save();
                res.status(201).send({"message": "Registration successful"});
                
            }
        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Internal Server Error"});
        }
    }
    
    
})

app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`)
})