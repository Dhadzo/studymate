const mongoose = require('mongoose')
const Schema = mongoose.Schema


const notificationSchema = mongoose.Schema({
    
    recipient: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    sender: {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    body: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required:true
    },
    typeId: {
        type: String,
        required:true
    },
    parentId: {
        type: String,
        required:false
    }
})

const Notification = mongoose.model('Notifiication', notificationSchema)

module.exports = Notification 