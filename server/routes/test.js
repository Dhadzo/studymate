const express = require('express');
const Chat = require('../models/Chat');
const User = require('../models/User')
const router = express.Router()

router.get('/test', async(req,res) => {
    const user = await User.findOne({username: 'primrose'});
    Chat.find().or([{user1: user}, {user2: user}])
        .populate('user1')
        .populate('user2')
        .populate('messages')
        .exec((err,chats) => {
            if(err) return handleError(err)
            res.send(chats)
        })
})

module.exports = router