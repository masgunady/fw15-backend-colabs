const errorHandler = require("../helpers/errorHandler.helper")
const fileRemover = require("../helpers/fileRemover.helper")
const profileModel = require("../models/profile.model")
const userModel = require("../models/user.model")
const argon = require("argon2")

exports.updateProfile = async(req, res) => {
    try {
        const {id} = req.user
        const user = await profileModel.findOneByUserId(id)
        console.log(user)
        const data = {
            ...req.body
        }
        if(req.file){
            if(user.picture){
                console.log(user.picture)
                fileRemover({filename: user.picture})
            }
            // data.picture = req.file.filename
            data.picture = req.file.path
        }
        const profile = await profileModel.updateByUserId(id, data)
        if(!profile){
            throw Error("update_profile_failed")
        }
        let updatedUser
        if(data.email){
            updatedUser = await userModel.update(id, data)
        }else{
            updatedUser = await userModel.findOne(id)
        }



        if(data.password){
            updatedUser = await userModel.update(id, {
                password: await argon.hash(data.password)
            })
        }else{
            updatedUser = await userModel.findOne(id)
        }

        const results = {
            ...profile,
            email: updatedUser?.email,
            role: user.role
        }
        return res.json({
            success: true,
            message: "Profile updated",
            results
      
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.getProfile = async (req, res) => {
    try {
        const {id} = req.user
        const profile = await profileModel.findOneByUserId(id)
        if(!profile){
            throw Error("profile_not_found")
        }
        return res.json({
            success: true,
            message: "Profile",
            results: profile
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
exports.getProfileInfo = async (req, res) => {
    try {
        const id = req.params.id
        const profile = await profileModel.findOneByUserId(id)
        if(!profile){
            throw Error("profile_not_found")
        }
        return res.json({
            success: true,
            message: "Profile",
            results: profile
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
