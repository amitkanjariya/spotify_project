import mongoose from "mongoose";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
const Userschema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
    },
    phoneNO:{
      type:Number,
      unique:true
    },
    password:{
        type:String,
        unique:true,
        required:true
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})
Userschema.pre("save",async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password,10)
        next()
    }   
    else{
        next()
    }
})
Userschema.methods.isPasswordCorrect=async function (password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesstoken = function () {
    // Payload means data
    Jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshtoken = function () {
    Jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User",Userschema)