import User from "../models/user.model"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import 'dotenv/config'
import otpGenerator from 'otp-generator'
import OTP from "../models/otp.model"


export const otpSender=async(req,res)=>{
    try{
        const {email}=req.body
        if(!email){
            return res.status(400).json({
                success:false,
                message:'Email is required'
            })
        }
        const findUser=await User.findOne({email})
        if(findUser){
            return res.status(400).json({
                success:false,
                message:'Email already exists'
            })
        }
        let otp=otpGenerator.generate(6,{upperCaseAlphabets:false,
            specialChars:false,
            lowerCaseAlphabets:false,

        })
        const payload={email,otp}

        const newOtp=await OTP.create(payload)

        return res.status(200).json({
            success:false,
            message:'OTP sent successfully'
        })

    }catch(err){
        return res.status(500).json({
            succes:false,
            message:'Internal Server Error'
        })
    }
}

export const SignUp = async (req, res) => {
    try {
        const { fullName, userName, email, password, confirmPasssword, gender, profilePicture } = req.body

        if (!fullName || !userName || !email || !password || !confirmPasssword || !gender) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password.trim() !== confirmPasssword.trim()) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match"
            })
        }
        const userNameExists = await User.findOne({ userName: userName })
        if (userNameExists) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            })
        }
        const emailExists = await User.findOne({ email: email })
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
            profilePicture: gender === 'Male' ? boyPic : girlPic
        })

        const savedUser= await newUser.save()

        if (!savedUser) {
            return res.status(500).json({
                success: false,
                message: "Signup failed"
            })
        }

        const payload={
            userName:savedUser.userName,
            email:savedUser.email,
            id:savedUser._id,

        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' })

        const option={
            httpOnly:true,
            expires:new Date(Date.now()+7*24*60*60*1000),
            sameSite:'Lax',
            secure:process.env.NODE_ENV === 'production'?true:false
        }
        return res.cookie('token',token,option).status(201).json({
            success:true,
            message:'User created successfully',
            user:savedUser
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const login = async(req, res) => {
    try {
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                success:false,
                message:'No user found'
            })
        }

        const isPassword=await bcrypt.compare(password,user.password)

        if(!isPassword){
            const payload={
                userName:user.userName,
                email:user.email,
                id:user._id,
            }


            user.toObject()
            user.password=null


            const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})

            const option={
                httpOnly:true,
                sameSite:'Lax',
                secure:process.env.NODE_ENV==='production',
                expires:new Date(Date.now()+7*24*60*60*1000)
            }
            

            return res.cookie('token',token,option).status(200).json({
                success:true,
                message:'Login successful',
                user
            })
        }else{
            return res.status(400).json({
                success:false,
                message:'Incorrect password'
            })
        }


    } catch (err) {
        return res.status(500).json({
            success: false
        })
    }
}