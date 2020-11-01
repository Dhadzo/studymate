const mongoose = require('mongoose')
const Schema = mongoose.Schema

const discussionSchema = mongoose.Schema({
    topic: {
        type: String,
        required: true
    },
    creator: {
            type:Schema.Types.ObjectId,
            ref:'User'
   },
    messages: [
       {
            type: Schema.Types.ObjectId,
            ref:'Message'
       }    
    ],
    likes: {
        type: Number,
        required:false
    },
    image: {
        type: String,
        required:false
    },
    video: {
        type: String,
        required:false
    }
})

const Discussion = mongoose.model('Discussion', discussionSchema)

module.exports =  Discussion 