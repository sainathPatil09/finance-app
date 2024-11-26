import jwt from 'jsonwebtoken'
import {User} from '../Model/user.model.js'

const createTokenAndSaveCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_TOKEN, {
        expiresIn:"10d"
    })
    // console.log(token)
    res.cookie("jwt", token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    // await User.findByIdAndUpdate(userId, {token});
    return token;
};

export default createTokenAndSaveCookie