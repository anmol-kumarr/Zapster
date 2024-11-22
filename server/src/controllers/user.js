import User from '../models/user.model.js'

export const userData = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findById(userId)

        userDetails.toObject()
        userDetails.password = null


        return res.status(200).json({
            success: true,
            message: 'details fetched successfully',
            data: userDetails
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}



export const getUserList = async (req, res) => {
    try {
        const { userName } = req.query
        console.log("userName", req.query.userName)

        const response = await User.find({
            userName: { $regex: new RegExp(userName, 'i') }
        }).select('userName profilePicture fullName').limit(5);
        // console.log(response)
        if (!response.length > 0) {
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Username fetched successfully',
            data: response
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}