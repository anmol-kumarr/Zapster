import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.id
        const receiverId = req.params.id
        const message = req.body.message

        if (!message) {
            return res.status(400).xjson({
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
            success:true,
            message:'message created'
        })



    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}