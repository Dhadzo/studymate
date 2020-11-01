const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = mongoose.Schema({
    user1:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    user2:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    messages: [
        {
             type: Schema.Types.ObjectId,
             ref:'Message'
        }    
     ],
})
const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat 