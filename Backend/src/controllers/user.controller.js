import asynchandler from '../utils/asynchandler.js'
import Apierrors from '../utils/Apierrors.js'
import Apiresponse from '../utils/Apiresponse.js'
import { User } from '../models/user.model.js'
const generateaccesstokenandrefreshtoken = async (id) => {
    const user = await User.findById(id)
    const accessToken = user.generateAccesstoken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }
}
const Signup = asynchandler(async (req, res, next) => {
    const { username, email, phoneNo, password } = req.body
    if ([phoneNo, username, email, password].some((fields) => fields?.trim() === "")) {
        throw new Apierrors(400, "Please provide all the required information");
    }
    const useralreadyexistornot = User.findOne({
        $or: [{ username }, { email }, { phoneNo }]
    })
    if (useralreadyexistornot) {
        throw new Apierrors(409, "User already exists")
    }
    const user = await User.create({
        username,
        email,
        phoneNo,
        password
    })
    const createdUser = await User.findById(user._id).select('-password -refreshToken')
    if (!createdUser) {
        return new Apierrors(500, "Something went wrong while registering user.")
    }
    return res.status(201).json(new Apiresponse(200, createdUser, "User registered Successfully"))
})
const login = asynchandler(async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return new Apierrors(400, "Username and password is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { password }]
    })
    if (!user) {
        return new Apierrors(401, "Invalid Credentials")
    }
    const ispasswordcorrect = await user.isPasswordCorrect(password)
    if (!ispasswordcorrect) {
        return new Apierrors(401, 'Invalid Password')
    }
    const { accessToken, refreshToken } = await generateaccesstokenandrefreshtoken(user._id)
    const loginuser = await User.findById(user._id).select("-password -refreshToken")
    const option = {
        httpOnly:true,
        secure:true
    }

    return res.status(200).cookie("accessToken",accessToken,option).cookie("refreshToken",refreshToken,option).json(new Apiresponse(200,{user:loginuser,refreshToken,accessToken},"User Login Successfully"))
})
export { Signup, login }