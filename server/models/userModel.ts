import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: "string",
        required: [true, "Please Add Your Name! "],
        trim : true,
        maxLength:[20, "Your Name is upto 20 characters! "]
    },

    account :{
        type: "string",
        required: [true, "Please Add Your Email Or Phone! "],
        trim : true,
        unique : true
    },

    password :{
        type: "string",
        required: [true, "Please Add Your Password! "],
        trim : true,
    },

    avatar :{
        type: "string",
        default : "https://res.cloudinary.com/dula-sorg/image/upload/v1654585660/cld-sample.jpg"
    },

    role:{
        type: "string",
        default: "normal"
    },

    type:{
        type: "string",
        default: "normal"
    }

},{
    timestamps: true
})

export default mongoose.model('User',userSchema)