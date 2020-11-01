const express = require('express')
const router = express.Router()
const User  = require('../models/User')
const Notification = require('../models/Notification')
const auth = require('../Middleware/authenticate')


router.get('/notifications/:userId',auth, async (req,res) => {
    const user = await User.find({_id: req.params.userId})
    const notifications = await Notification.find({recipient: user}).populate({path: 'sender'}).sort({$natural: -1})
    res.send(notifications)
})


module.exports = router