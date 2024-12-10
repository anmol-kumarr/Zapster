import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import 'dotenv/config'
import otpGenerator from 'otp-generator'
import OTP from "../models/otp.model.js"
import BlackList from "../models/blacklist.model.js"
import 'dotenv/config'


export const otpSender = async (req, res) => {
    try {
        const { email, userName } = req.body
        if (!email, !userName) {
            return res.status(400).json({
                success: false,
                message: 'Fields are required'
            })
        }
        const findName = await User.findOne({ userName })


        if (findName) {
            return res.status(400).json({
                success: false,
                message: 'User name already axist'
            })
        }


        const findUser = await User.findOne({ email })



        if (findUser?.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists'
            })
        }
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,

        })
        const newOtp = await OTP.create({ email, otp })

        return res.status(200).json({
            success: false,
            message: 'OTP sent successfully'
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: 'Internal Server Error'
        })
    }
}

export const SignUp = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender, profilePicture, otp } = req.body

        if (!fullName || !userName || !email || !password || !confirmPassword || !gender || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        console.log('password', password.trim())
        console.log('confirmPassword', confirmPassword.trim())
        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const findOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1)
        console.log('otp', findOtp)

        if (!findOtp || findOtp?.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Otp not found'
            })
        } else if (findOtp.otp !== otp) {
            return res.status(400).json({
                success: false,
                message: 'Invalid otp'
            })
        }



        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            email,
            friends: [],
            profilePicture: gender === 'Male' ? boyPic : girlPic
        })

        const savedUser = await newUser.save()

        if (!savedUser) {
            return res.status(500).json({
                success: false,
                message: "Signup failed"
            })
        }

        savedUser.toObject()
        savedUser.password = null

        const payload = {
            userName: savedUser.userName,
            email: savedUser.email,
            id: savedUser._id,

        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

        const option = {

            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days

        }
        return res.cookie('token', token, option).status(201).json({
            success: true,
            message: 'User created successfully',
            user: savedUser
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'No user found'
            })
        }

        const isPassword = await bcrypt.compare(password.trim(), user.password)

        if (isPassword) {
            const payload = {
                userName: user.userName,
                email: user.email,
                id: user._id,
            }


            user.toObject()
            user.password = null


            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })



            const options = {
                httpOnly: true,
                sameSite: 'None',
                secure: process.env.NODE_ENV === 'production', // Ensure Secure cookies in production (only sent over HTTPS)
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
            };
            return res.cookie('token', token, option).status(200).json({
                success: true,
                message: 'Login successful',
                user
            })
        } else {
            return res.status(400).json({
                success: false,
                message: 'Incorrect password'
            })
        }


    } catch (err) {
        return res.status(500).json({
            success: false
        })
    }
}


export const checkUserName = async (req, res) => {
    try {
        const { userName } = req.body
        const findUser = await User.findOne({ userName: userName })
        if (findUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exist'
            })
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'Username does not exist'
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}


export const logout = async (req, res) => {
    try {
        const token = req.cookies.token || req.body.token || req.header('Authorization')?.replace('Bearer ', '')
        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'token is missing'
            })
        }

        const blacklistToken = await BlackList.create({ token })
        res.clearCookie('token')
        return res.status(200).json({
            succes: true,
            message: 'Logged out successfully'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}




export const insertData = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPassword, gender, profilePicture, otp } = req.body

        if (!fullName || !userName || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password.trim() !== confirmPassword.trim()) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }
        console.log('password', password)
        console.log('confirmPassword', confirmPassword)
        const emailExists = await User.findOne({ email })
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            })
        }

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`

        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            email,
            friends: [],
            profilePicture: gender === 'Male' ? boyPic : girlPic
        })


        await newUser.save()

        return res.status(201).json({
            success: true
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'internal server error'
        })
    }
}