import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id
        const receiverId = req.params.id
        const message = req.body.message

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message fields are empty'
            })
        }
        let findConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })

        if (!findConversation) {
            findConversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: []
            })
        }

        const newMessage = new Message({
            participants: [receiverId, senderId],
            messages: message
        })

        const newMessageResponse = await newMessage.save()

        findConversation.messages.push(newMessageResponse?._id)
        await findConversation.save()

        return res.status(201).json({
            success: true,
            message: 'message created',
            findConversation
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}



export const getMessage = async (req, res) => {
    try {
        const userToChat = req.params.id
        const userId = req.user.id

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;



        const conversation = await Conversation.findOne({
            participants: { $all: [userToChat, userId] }
        }).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('messages')
        const totalItems = await Item.countDocuments();
        const totalPages = Math.ceil(totalItems / limit);

        
        if(!conversation){
            return res.status(200).json({
                success:true,
                message:'Message is empty',
                data:[]
            })
        }


        return res.status(200).json({
            success:true,
            message:'Message fetched',
            data:conversation,
            meta:{
                totalItems,
                totalPages,
                currentPage:page,
                perPage:limit
            }
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}