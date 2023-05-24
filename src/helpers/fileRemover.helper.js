const fs = require("fs") //package bawaan node js (romve file manual)

const fileRemover = (file) => {
    if(file){
        console.log("unlink process")
        const filename = `uploads/${file.filename}`
        console.log(filename)
        fs.unlink(filename, (error)=> {
            try{
                if(error){
                    throw Error(error.message)
                }
            } catch(error){
                console.log(error)
            }
        })
    }
}

module.exports = fileRemover
