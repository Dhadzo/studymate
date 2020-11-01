const express = require('express')
const router = express.Router()
const auth = require('../Middleware/authenticate')
const Message  = require('../models/Message')
const User  = require('../models/User')
const Chat  = require('../models/Chat')


router.get('/mates/chats/:username',auth, (req,res) => {
    User.findOne({name: req.params.username},(err, user) => {
        if(err) return handleError(err)
        res.send(user.chats)
    })
})
router.get('/chats/:userId',auth, async (req,res) => {
    const user = await User.findOne({_id: req.params.userId});
        Chat.find().or([{user1: user}, {user2: user}])
        .populate('user1')
        .populate('user2')
        .populate('messages')
        .exec((err,chats) => {
            if(err) return handleError(err)
            res.send(chats)
        })
})
router.post('/addmate/:mateId',auth, async(req,res) => {
    const user = await User.findOne({_id: req.body.userId})
    const mate = await User.findOne({_id: req.body.mateId})

    Chat.findOne({
        $or: [
            {$and:[{user1:req.body.userId},{user2:req.body.mateId}]},
            {$and:[{user1:req.body.mateId},{user2:req.body.userId}]}
        ]
      }, (err, chat) => {
          if(err) return handleError(err) 
          if(chat){
              const Id = chat._id
              res.send({user,Id})
          }else{
                const newChat = new Chat({
                            user1: req.body.userId,
                            user2: req.body.mateId,
                            messages:[]
                        })
                newChat.save()
                user.chats.unshift(newChat)
                mate.chats.unshift(newChat)
                user.mates.unshift({_id: mate._id,name: mate.username})
                mate.mates.unshift({_id: user._id,name: user.username})
                user.save()
                mate.save()
                const Id = newChat._id
                res.send({user,Id})
          }
    })
})
router.get('/chat/:chatId',auth, async (req,res) => {
   Chat.findOne({_id: req.params.chatId})
   .populate('user1')
   .populate('user2')
   .populate({path: 'messages', populate: {path: 'sender'}})
   .exec((err, chat) => {
       if(err) return handleError(err)
       res.send(chat)
   })
})

module.exports = router