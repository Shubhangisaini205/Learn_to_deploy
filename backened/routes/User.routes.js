const express = require("express")
const jwt = require('jsonwebtoken')
const { UserModel } = require("../model/User.model")

const UserRouter = express.Router();
const bcrypt= require("bcrypt")



UserRouter.post("/register", async (req, res) => {
    const {name,email,pass,age}= req.body
    try {
        bcrypt.hash(pass,5,async(err,hash)=>{
            const user = new UserModel({email,name,age,pass:hash})
            await user.save()
            res.status(200).send({ "msg": "New User has been registered" })
        })
    } catch (err) {
        console.log(err)
        res.status(400).send({ "err": err.message })
    }

})

UserRouter.post("/login", async(req, res) => {
    const { email, pass } = req.body;
    try {
    //    let user = await UserModel.find({email:email,pass:pass}) 
    //    by ES6
    let user = await UserModel.findOne({email}) 
    if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token = jwt.sign({ authorId:user._id,author:user.name }, 'masai');
                res.status(200).send({"msg":"Login Successfull","token":token})
            }else{
                res.status(200).send({"msg":"Wrong Credentials"})
            }
        })  
    }
    } catch (error) {
        res.send({"err":error.message})
    }

})

module.exports = {
    UserRouter
}