const User  = require('../models/User')
const Chat = require('../models/Chat')
const Reply = require('../models/Reply')
const Message = require('../models/Message')
const Notification = require('../models/Notification')
const Discussion = require('../models/Discussion')


const createNotification = async (sender,recipient,messageBody, type, typeId, parentId) => {
    
    const newNotification = new Notification({
        recipient: recipient,
        sender: sender,
        body: messageBody,
        type: type,
        typeId: typeId,
        parentId: parentId
    })
    newNotification.save()
}

const addDiscussionMessage = async (message, discussionId,  currentUserId) => {
    const discussion = await Discussion.findOne({_id: discussionId})
    const sender = await User.findOne({_id: currentUserId})
    const newMessage = new Message({
        message_body: message,
        sender: sender,
        receiver: null
    })
    newMessage.save()
    console.log(newMessage._id)
    discussion.messages.push(newMessage)
    discussion.save()    
    const recipient = await User.findOne({_id: discussion.creator})
    const messageBody = `${sender.username} commented on your post.`
    const type = "comment"
    const typeId = newMessage._id
    const parentId = discussionId
    createNotification(sender,recipient,messageBody, type, typeId, parentId)
}

const addMessage = async (message,chatId,mateId,currentUserId) => {
    const chat =  await Chat.findOne({_id: chatId})
    const sender = await User.findOne({_id: currentUserId})
    const receiver = await User.findOne({_id: mateId})
   try {
        const newMessage = new Message({
            message_body: message,
            sender: sender,
            receiver: receiver
        })
        newMessage.save()
        chat.messages.push(newMessage)   
        chat.save()
   } catch (error) {
        console.log(error)   
   }
}
const getChatMessages =  async chat => { 
    try {
        const chatMessages = await Message.find({chat_id:chat}) 
        return chatMessages   
    } catch (error) {
        return {message: 'No messages found'}        
    }
 }

const addReply = async (reply,messageId, senderId) => {
    const tempMessage = await Message.findOne({_id: messageId})
    const sender = await User.findOne({_id: senderId})
    const tempReply = new Reply({
        message: reply,
        sender: sender
    })
    tempReply.save()
    tempMessage.replies.push(tempReply)
    tempMessage.save()    
}
module.exports =  {
           createNotification, 
           addDiscussionMessage,
           addMessage,
           getChatMessages,
           addReply
        }