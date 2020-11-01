const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new mongoose.Schema({
    message_body:{
      required: true,
      type: String  
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    likes: {
        type:Number,
        required:false
    },
    replies: [ 
      {
        type:Schema.Types.ObjectId,
        ref:'Reply',
        required:false
      }
    ]
})
const Message = mongoose.model('Message',messageSchema)

module.exports =  Message 