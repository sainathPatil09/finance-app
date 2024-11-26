import {User} from "../Model/user.model.js";
import {incomeModel} from '../Model/income.model.js'
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import createTokenAndSaveCookie from '../Jwt/generateToken.js'


//signup
export const signup = async (req, res) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ message: "User photo required" });
          }
        
          const { photo } = req.files;
        
          const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
          if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Invalid photo formate" });
        }
        
        const { fullname, email, password, confirmPassword } = req.body;
        
        if(password !== confirmPassword){
              return res.status(400).json({ message: "password do not match" });
            
          }
        
          if (!fullname || !email || !password || !confirmPassword || !photo) {
            return res.status(400).json({ message: "Please fill required fields" });
          }
        
          const user = await User.findOne({ email });
          if (user) {
            return res.status(400).json({ message: "User already exists" });
          }
        
          const cloudinaryResponse = await cloudinary.uploader.upload(
            photo.tempFilePath
          );
        
          if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.log(cloudinaryResponse.error);
          }
        
          const hashPasword = await bcrypt.hash(password, 10)
          const newUser = new User({
            fullname,
            email,
            password: hashPasword,
            photo: {
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
            },
          });
        
          await newUser.save();
        
          if (newUser) {
             createTokenAndSaveCookie(newUser._id, res) //passing payload as id
            // console.log(token)
            return res
              .status(200)
              .json({ message: "User singup succesfully", newUser });
          }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal server error"})
    }
};


//signup
export const login = async (req, res) =>{
  
  try {
      const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "please fill required field " });
        }
        
        const user = await User.findOne({email}).select("+password");
        if(!user.password){
            return res.status(400).json({ message: "user password is missing" });
            
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({ message: "Invalid eamil or password" });
        }

        createTokenAndSaveCookie(user._id, res);

        res.status(200).json({message: "User logged in successfully", user:{
            _id : user._id,
            email : user.email,
            password : user.password
        }
    })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal server error"})
    }
}


export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({message: "user logged out successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}


export const getUser = (req, res)=>{
  try {
    const user = req.user; // The `req.user` is set by the middleware `secureRoute`
    console.log(user , " user")
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
} catch (error) {
    console.error("Error fetching authenticated user:", error);
    res.status(500).json({ error: "error in getUser" });
}
}

export const deleteTransaction = async (req, res)=>{
  try {
    const id = req.params.id
    console.log(id, " delete tra")
    


    const data = await incomeModel.findByIdAndDelete({_id : id});
    console.log(data)
    
    console.log("deleted")
    res.status(200).json({message: "transaction deleted succssfully"})
  } catch (error) {
    console.error("Error in deleting transaction:", error);
    res.status(500).json({ error: "Error in deleting transaction" });
  }
}



