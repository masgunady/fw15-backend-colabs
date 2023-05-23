const userModel = require("../models/user.model")
const profileModel = require("../models/profile.model")
const forgotRequest = require("../models/forgotRequest.model")
// const erorrHandler = require("../helpers/errorHandler.helper")
const jwt = require("jsonwebtoken")
const {APP_SECRET} = process.env
const argon = require("argon2")

exports.login = async (request, response) => {
    try{
        const {email, password} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("wrong_credentials")
        }
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw Error("wrong_credentials")
        }
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Login Success!",
            results: {token} 
        })
    }catch(err){
        // return erorrHandler(response, err)
        return console.log(err)
    }
}

exports.register = async(request, response) => {
    try{
        const {fullName, password, confirmPassword} = request.body
        if(password !== confirmPassword){
            throw Error("password_unmatch")
        }
        const hash = await argon.hash(password)
        const data = {
            ...request.body,
            password: hash
        }
        const user = await userModel.insert(data)
        const profileData = {
            fullName,
            userId: user.id
        }
        await profileModel.insert(profileData)
        const token = jwt.sign({id: user.id}, APP_SECRET)
        return response.json({
            success: true,
            message: "Register Success!",
            results: {token} 
        })
    }catch(err){
        // return erorrHandler(response, err)
        return console.log(err)
    }
}

exports.forgotPassword = async (request, response) => {
    try{
        const {email} = request.body
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw Error("no_user")
        }
        const randomNumber = Math.random()
        const rounded = Math.round(randomNumber * 100000)
        const padded = String(rounded).padEnd(6, "0")

        const forgot = await forgotRequest.insert({
            email: user.email,
            code: padded
        })
        if(!forgot){
            throw Error("forgot_failed")
        }
        return response.json({
            success: true,
            message: "Request Reset password success!"
        })
    }catch(err){
        // return erorrHandler(response, err)
        return console.log(err)
    }
}

exports.resetPassword = async (request, response) => {
    try{
        const {code, email, password} = request.body
        const find = await forgotRequest.findOneByCodeAndEmail(code, email)
        if(!find){
            throw Error("no_forgot_request")
        }
        const selectedUser = await userModel.findOneByEmail(email)
        const data = {
            password: await argon.hash(password)
        }
        const user = await userModel.update(selectedUser.id, data)
        if(!user){
            throw Error("no_forgot_request")
        }
        return response.json({
            success: true,
            message: "Reset Password success!"
        })
    }catch(err){
        // return erorrHandler(response, err)
        return console.log(err)
    }
}
