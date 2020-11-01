const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
        min: 6
    },
    email: {
        type: String,
        required: true,
        max: 50,
        min:6
    },
    username: {
        type: String,
        required:true,
        min:6,
        max:50
    },
    password: {
        type: String,
        required: true,
        max:50,
        min: 6
    },
    mates: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        required: false
    },
    chats: [
        {
             type: Schema.Types.ObjectId,
             ref:'Chat'
        }    
     ],
})
const User = mongoose.model('User', userSchema)

module.exports = User