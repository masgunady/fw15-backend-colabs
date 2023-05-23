const { body, validationResult } = require("express-validator")
// const errorHandler = require("../helpers/erorHandler.helper")

const emailFormat = body("email").isEmail().withMessage("Email is invalid")
const strongPassword = body("password").isStrongPassword().withMessage("Password Error")

const rules = {
    authLogin: [
        emailFormat,
        body("password").isLength({min: 1}).withMessage("Password must be strong")
    ],
    createUser: [
        body("username").isLength({min: 3, max: 80}).withMessage("Name length is invalid"),
        emailFormat,
        strongPassword
    ],
    resetPassword:[
        body("confirmPassword").custom((value, {req}) => {
            return value === req.body.password
        }).withMessage("confirm password does not match")
    ]
}

const validator = (request, response, next) => {
    const errors = validationResult(request)
    try{
        if(!errors.isEmpty()) {
            throw Error("validation")
        }
        return next()
    }catch(err){
        return response.status(400).json({ 
            success: false,
            message: "Validation Error",
            results: errors.array()
        })
    }
}
const validate = (selectedRules) => [rules[selectedRules], validator]

module.exports = validate
