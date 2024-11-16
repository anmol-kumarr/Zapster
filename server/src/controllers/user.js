import User from '../models/user.model.js'

export const userData = async (req, res) => {
    try {
        const userId=req.user.id
        const userDetails=await User.findById(userId)

        userDetails.toObject()
        userDetails.password=null

        
        return res.status(200).json({
            success:true,
            message:'details fetched successfully',
            data:userDetails
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}