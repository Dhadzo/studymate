const mongoose = require('mongoose')
const Schema = mongoose.Schema

const replySchema = new mongoose.Schema({
    message:{
      type: String,  
      required: true  
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    likes_number: {
        type:Number,
        required:false
    },
})
const Reply = mongoose.model('Reply', replySchema)

module.exports = Reply