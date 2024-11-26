import mongoose from "mongoose";
import validator from 'validator'
const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator: [validator.isEmail, "Please enter a valid email"]
    },
    photo:{
        public_id:{
            type:String,
            require:true,
        },
        url:{
            type:String,
            require:true,
        }
    },  
    password:{
        type:String,
        require:true,
    },
    confirmPassword:{
        type:String,
    },
    token:{
        type:String,
    }
},{timestamps:true})

export const User = mongoose.model("User", userSchema);
