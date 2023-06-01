const errorHandler = (response, error) => {

    if (error?.message?.includes("duplicate key")) {
        return response.status(409).json({
            success: false,
            message: "Error: Email already exist !"
        })
    }
    if(error?.message?.includes("jwt malformed")) {
        console.log(error)
        return response.status(401).json({
            success: false, 
            message: "Token is invalid"
        })
    }
    if(error?.message?.includes("data_not_found")) {
        console.log(error)
        return response.status(401).json({
            success: false, 
            message: "article not found"
        })
    }
    if(error?.message?.includes("please_sign_in")) {
        console.log(error)
        return response.status(401).json({
            success: false, 
            message: "Please login to create article or request to be an author!"
        })
    }
    if(error?.message?.includes("maximum_like")) {
        console.log(error)
        return response.status(400).json({
            success: false, 
            message: "Thank's, your number of likes has reached the maximum limit!"
        })
    }
    if(error?.message?.includes("category_not_found")) {
        console.log(error)
        return response.status(401).json({
            success: false, 
            message: "category id not found!"
        })
    }
    if(error?.message?.includes("invalid signature")) {
        
        return response.status(401).json({
            success: false, 
            message: "Token signature is invalid"
        })
    }
    if(error?.message?.includes("request_author_is_being_processed")) {
        
        return response.status(401).json({
            success: false, 
            message: "Your request is being processed by the system!"
        })
    }
    if(error?.message?.includes("update_user_failed")) { //cara kang irul di validator untuk controller update
        return response.status(400).json({
            success: false,
            message: "Id is not found"
        })
    }
    if(error === undefined) {
        return response.status(404).json({
            success: false,
            message: "Error: user not found"
        })
    }
    
    if(error?.message?.includes("empty_field")) {
      
        return response.status(400).json({
            success: false, 
            message: "Email or password cannot be empty"
        })
    }
    if(error?.message?.includes("email_format")) {
      
        return response.status(400).json({
            success: false, 
            message: "Wrong email format"
        })
    }
    if(error?.message?.includes("wrong_credentials")) {
        return response.status(401).json({
            success: false, 
            message: "Wrong email or password"
        })
    }
    if(error?.message?.includes("wrong_password")) {
        return response.status(401).json({
            success: false, 
            message: "Wrong password"
        })
    }
    if(error?.message?.includes("no_user")) {
        return response.status(400).json({
            success: false, 
            message: "Email haven't registered"
        })
    }
    if(error?.message?.includes("password_unmatch")) {
        return response.status(400).json({
            success: false, 
            message: "Password and Confirm Password unmatched"
        })
    }
    if(error?.message?.includes("event_invalid")) {
        return response.status(400).json({
            success: false, 
            message: "eventId invalid, Event not found!!"
        })
    }
    if(error?.message?.includes("eventId_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "Event Id not found!!"
        })
    }
    if(error?.message?.includes("userId_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "User Id not found!!"
        })
    }
    if(error?.message?.includes("status_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "Status not found!!"
        })
    }
    if(error?.message?.includes("paymentMethodId_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "Payment Method Id not found!!"
        })
    }
    if(error?.message?.includes("sectionId_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "Section Id not found!!"
        })
    }
    if(error?.message?.includes("reservationId_not_found")) {
        return response.status(400).json({
            success: false, 
            message: "Reservation Id not found!!"
        })
    }
    if(error?.message?.includes("no_forgots_requested")) {
        return response.status(400).json({
            success: false, 
            message: "Cant' find Email or Code requested"
        })
    }
    if(error?.message?.includes("unauthorized")) {
        return response.status(401).json({
            success: false, 
            message: "Unauthorized"
        })
    }
    if(error?.message?.includes("jwt expired")) {
        return response.status(401).json({
            success: false, 
            message: "Unauthorized: Token Expired"
        })
    }
    if(error?.message?.includes("invalid token")) {
        return response.status(401).json({
            success: false, 
            message: "Unauthorized: Invalid Token, please relogin"
        })
    }
    console.log(error)
    return response.status(500).json({
        success: false,
        message: "Error: Internal server error !"
    }) 
}

module.exports = errorHandler
