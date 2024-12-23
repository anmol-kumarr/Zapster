import jwt from 'jsonwebtoken'
import 'dotenv/config'


const UserMiddleware=async(req,res,next)=>{
    try{
        const token=req.body.token || req.cookies.token || req.header('Authorization')?.replace('Bearer','')

        if(!token){
            return res.status(401).json({
                success:false,
                message:'Unauthorized access'
            })
        }
        // console.log()
        // console.log(process.env.JWT_SECRET)
        const decode=jwt.verify(token,process.env.JWT_SECRET)


        req.user=decode
        next()

    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export default UserMiddleware